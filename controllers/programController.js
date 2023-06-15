const {Subsystem, Program} = require('../models/index')

class ProgramController {
    async getAllPrograms(req, res) {
        try {
            const programs = await Program.findAll({include: [Subsystem]});
            res.status(200).json(programs);
        } catch (error) {
            res.status(500).json({ error: 'Не удалось получить программы' });
        }
    }

    async createProgram(req, res) {
        try {
            const { name } = req.body;
            const program = await Program.create({ name });

            res.status(200).json(program);
        } catch (error) {
            res.status(500).json({ error: 'Не удалось создать прогрмму' });
        }
    }

    async editProgram(req, res) {
        try {
            const { id, name } = req.body;

            const program = await Program.findByPk(id);

            if (!program) {
                return res.status(500).json({ error: 'Программа не найдена' });
            }

            const updatedProgram = await program.update({ name });

            res.status(200).json(updatedProgram);
        } catch (error) {
            res.status(500).json({ error: 'Не удалось отредактировать программу' });
        }
    }

    async deleteProgram(req, res) {
        try {
            const { id } = req.body;
            const program = await Program.findByPk(id);

			if (!program) {
				return res.status(500).json({ error: 'Программа не найдена' });
			}

			await program.destroy();
            res.status(200).json({ message: 'Программа удалена успешно' });
        } catch (error) {
            res.status(500).json({ error: 'Не удалось удалить программу' });
        }
    }
}

module.exports = new ProgramController()
