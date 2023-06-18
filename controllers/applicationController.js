const { Application, Program, Subsystem, Type } = require('../models/index');

class ApplicationController {
	async createApplication(req, res) {
		try {
			const { description, organization, fullName, departureDepartment, programId, subsystemId, typeId } = req.body;

			const program = await Program.findByPk(programId, { include: Subsystem });
			if (!program) {
				return res.status(500).json({ error: 'Заданная программа не найдена' });
			}

			const subsystems = program.subsystems;
			const selectedSubsystem = subsystems.find(subsystem => subsystem.id === subsystemId);

			if (!selectedSubsystem) {
				return res.status(400).json({ error: 'Заданная подсистема недоступна для данной программы' });
			}
			const type = await Type.findByPk(typeId);
			if (!type) {
				return res.status(500).json({ error: 'Заданный тип обращения не найден' });
			}

			const application = await Application.create({ description, organization, fullName, departureDepartment });
			await application.setProgram(program);
			await application.setSubsystem(selectedSubsystem);
			await application.setType(type);

			res.status(200).json({ message: 'Заявление успешно создано' });
		} catch (error) {
			res.status(500).json({ error: 'Не удалось создать заявление' });
		}
	}

	async editApplication(req, res) {
		try {
			const { id, description, organization, fullName, departureDepartment, programId, subsystemId, typeId } = req.body;

			const application = await Application.findByPk(id);
			if (!application) {
				return res.status(500).json({ error: 'Заявление не найдено' });
			}

			const program = await Program.findByPk(programId, { include: Subsystem });
			if (!program) {
				return res.status(500).json({ error: 'Заданная программа не найдена' });
			}

			const subsystems = program.subsystems || [];
			const selectedSubsystem = subsystems.find(subsystem => subsystem.id === subsystemId);

			if (!selectedSubsystem) {
				return res.status(400).json({ error: 'Заданная подсистема недоступна для данной программы' });
			}

			const type = await Type.findByPk(typeId);
			if (!type) {
				return res.status(500).json({ error: 'Заданный тип обращения не найден' });
			}

			const updatedApplication = await application.update({ description, organization, fullName, departureDepartment });
			await application.setProgram(program);
			await application.setSubsystem(selectedSubsystem);
			await application.setType(type);

			res.status(200).json(updatedApplication);
		} catch (error) {
			res.status(500).json({ error: 'Не удалось изменить заявление' });
		}
	}

	async setStatusApplication(req, res) {
		try {
			const { id, status } = req.body;

			const application = await Application.findByPk(id);
			if (!application) {
				return res.status(500).json({ error: 'Заявление не найдено' });
			}
			if (!status) {
				return res.status(500).json({ error: 'Отсутствует значение статуса' });
			}

			const updatedApplication = await application.update({ status });

			res.status(200).json(updatedApplication);
		} catch (error) {
			res.status(500).json({ error: 'Не удалось обновить статус заявления' });
		}
	}

	async deleteApplication(req, res) {
		try {
			const { id } = req.body;
			const application = await Application.findByPk(id);

			if (!application) {
				return res.status(500).json({ error: 'Заявление не найдено' });
			}

			await application.destroy();

			res.status(200).json({ message: 'Заявление удалено успешно' });
		} catch (error) {
			res.status(500).json({ error: 'Не удалось удалить заявление' });
		}
	}

	async getApplicationsById(req, res) {
		try {
			const {id} = req.body;
			const application = await Application.findByPk(id);

      res.status(200).json(application);

		} catch (error) {
			res.status(500).json({ error: 'Не удалось получить заявления' });
		}
	}

	async getAllApplications(req, res) {
		try {
			const applications = await Application.findAll({
				order: [['status', 'ASC']],
			});

			const groupedApplications = applications.reduce((result, application) => {
        const status = application.status;
        if (!result[status]) {
          result[status] = [];
        }
        result[status].push(application);
        return result;
      }, {});

      res.status(200).json(groupedApplications);

		} catch (error) {
			res.status(500).json({ error: 'Не удалось получить заявления' });
		}
	}
}

module.exports = new ApplicationController();
