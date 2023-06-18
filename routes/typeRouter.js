const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');
const authMiddleware = require('../middleware/authMiddleware')

// POST /api/types - Создать новый тип обращения
router.post('/', authMiddleware, typeController.createType);

// PUT /api/types - Создать новый тип обращения
router.put('/', authMiddleware, typeController.editType);

// DELETE /api/types - Удалить тип обращения
router.delete('/', authMiddleware, typeController.deleteType);

// GET /api/types - Получить все типы обращений
router.get('/', typeController.getAllTypes);

module.exports = router;
