const {Subsystem, Program} = require('../models/index')

class SubsystemController {
    async getAllSubsystems(req, res) {
        try {
            const subsystems = await Subsystem.findAll();
            res.status(200).json(subsystems);
        } catch (error) {
            res.status(500).json({ error: 'Не удалось получить подсистемы' });
        }
    }

    async createSubsystem(req, res) {
        try {
            const { programId, name, description } = req.body;
            // TODO создавать ключевые слова

            const program = await Program.findByPk(programId);
            console.log(program)
            if (!program) {
                return res.status(500).json({ error: 'Программа не найдена' });
            }
            const subsystem = await Subsystem.create({ name, description });
            await subsystem.setProgram(program);

            res.status(200).json(subsystem);
        } catch (error) {
            res.status(500).json({ error: 'Не удалось создать подсистему' });
        }
    }

    async editSubsystem(req, res) {
        try {
            const { id, name, description } = req.body;
            const subsystem = await Subsystem.findByPk(id);

            if (!subsystem) {
                return res.status(500).json({ error: 'Подсистема не найдена' });
            }

            // TODO создавать ключевые слова
            const updatedSubsystem = await subsystem.update({ name, description });

            res.status(200).json(updatedSubsystem);
        } catch (error) {
            res.status(500).json({ error: 'Не удалось отредактировать подсистему' });
        }
    }

    async deleteSubsystem(req, res) {
        try {
            const { id } = req.body;
            const subsystem = await Subsystem.findByPk(id);

            if (!subsystem) {
                return res.status(500).json({ error: 'Подсистема не найдена' });
            }

            await subsystem.destroy();

            res.status(200).json({ message: 'Подсистема удалена успешно' });
        } catch (error) {
            res.status(500).json({ error: 'Не удалось удалить подсистему' });
        }
    }
}

module.exports = new SubsystemController()
