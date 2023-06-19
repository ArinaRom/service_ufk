const { Configuration, OpenAIApi } = require("openai");
const { Type, Subsystem, Program } = require('../models/index');

class OpenAiController {
	constructor(){
		this.api_key = process.env.CHAT_GPT_API_KEY
		this.organization_key = process.env.CHAT_GPT_ORG_KEY
		this.labels = ["ошибка"];

		this.configuration = new Configuration({
			apiKey: this.api_key,
			organization: this.organization_key,
		})

		this.openai = new OpenAIApi(this.configuration);

		this.generateArray = this.generateArray.bind(this)
		this.classifyProblem = this.classifyProblem.bind(this)
	}

	async generateArray(req, res) {
		try {
			const { prompt } = req.body;

			const modifiedPrompt = `${prompt}\nОтвет должен быть возвращён в виде нумерованного списка строковых значений`;
			const maxTokens = Math.max(Math.ceil(modifiedPrompt.length * 1.3), 800);

			const result = await this.openai.createCompletion({
				model: "text-davinci-003",
				prompt: modifiedPrompt,
				max_tokens: maxTokens,
				n: 1,
			});

			const results = result.data.choices[0].text.trim();

			const lines = results.split("\n");
			const filteredLines = lines.filter((line) => {
				const str = line.trim()
				return (str != "") && (str != ".") && (str != ":")
			});
			const listArray = filteredLines.map((line) => line.replace(/^\d+\.\s*/, ""));

			res.status(200).json({results: listArray});
		} catch (error) {
			res.status(500).json({ error: error });
		}
	}

	async classifyProblem(req, res) {
    try {
      const { description } = req.body;

			if (!description) {
				res.status(500).json({ error: 'Не введено описание' });
			}

			const types = await Type.findAll({
				attributes: ['id', 'name', 'keywords']
			});
			const typesNames = types.map(el => {
				if (el.keywords) {
					return `${el.name}:\n\tЗадачи:${el.keywords?.join(", ")}`
				}
				return el.name
			})

			const subsystems = await Subsystem.findAll({
				attributes: ['id', 'name', 'keywords']
			});
			const subsystemNames = subsystems.map(el => {
				if (el.keywords) {
					return `${el.name}:\n\tЗадачи:${el.keywords?.join(", ")}`
				}
				return el.name
			})
			const subsystemsPrompt = `Ниже представлено описание заявки пользователя, список подсистем бухгалтерских программ и типы заявок, к которым относится обращение. У каждой подсистемы и типа обращения описаны задачи, которыми те занимаются: \n\nПодсистема: \n${subsystemNames.join(", ")}\n\Тип обращения: \n${typesNames.join(", ")}\n\nОписание заявки: ${description}\n\nОтвет необходимо предоставить в формате JSON с ключами: subs (в котором хранится массив с единственной 'подсистемой' к которой относится 'обращение') и types (в котором хранится массив с единственным 'типом обращений' к которому относится 'обращение')`;

			const subsystemsRes = await this.openai.createCompletion({
        model: "text-davinci-003",
				prompt: subsystemsPrompt,
        max_tokens: 2400,
        temperature: 0,
				top_p: 1.0,
				frequency_penalty: 0.0,
				presence_penalty: 0.0,
      });

			const results = subsystemsRes.data.choices[0].text.trim();

			const jsonStartIndex = results.indexOf('{');
			const jsonEndIndex = results.lastIndexOf('}') + 1;
			const jsonString = results.substring(jsonStartIndex, jsonEndIndex);

			let jsonObject = {}

			try {
				jsonObject = JSON.parse(jsonString);
			} catch(error) {
				console.error("Ошибка парсинга JSON:", error);
			}


			let resTypes = [];
			let resSubs = [];
			if (jsonObject.types) {
				resTypes = await Type.findAll({
					where: {name: jsonObject.types}
				});
			}
			if (jsonObject.subs) {
				resSubs = await Subsystem.findAll({
					where: {name: jsonObject.subs},
					include: Program
				});
			}
			const resProgram = resSubs.map(el => el.program)

      res.status(200).json({ program: resProgram, subs: resSubs, types: resTypes, results });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OpenAiController()
