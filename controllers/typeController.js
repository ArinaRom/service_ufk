const {Type} = require('../models/index')

class TypeController {
    async createType(req, res) {
        try {
            const { name, description } = req.body;
            // TODO создавать ключевые слова
            const type = await Type.create({ name, description });
            res.status(200).json(type);
        } catch (error) {
            res.status(500).json({ error: 'Не удалось создать тип обращения' });
        }
    }

    async deleteType(req, res) {
        try {
            const { id } = req.body;

            const type = await Type.findByPk(id);

            if (!type) {
                return res.status(500).json({ error: 'Тип обращения не найдена' });
            }

            await type.destroy();
            res.status(200).json({ message: 'Тип обращения удален успешно' });
        } catch (error) {
            res.status(500).json({ error: 'Не удалось удалить тип обращения' });
        }
    }

    async getAllTypes(req, res) {
        try {
            const types = await Type.findAll();
            res.status(200).json(types);
        } catch (error) {
            res.status(500).json({ error: 'Не удалось получить тип обращения' });
        }
    }
}

module.exports = new TypeController()
