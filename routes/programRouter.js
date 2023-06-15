const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const authMiddleware = require('../middleware/authMiddleware')

// GET /api/programs - Получить все программы
router.get('/', programController.getAllPrograms);

// POST /api/programs - Создать новую программу
router.post('/', authMiddleware, programController.createProgram);

// PUT /api/programs - Изменить программу
router.put('/', authMiddleware, programController.editProgram);

// DELETE /api/programs - Удалить программу
router.delete('/', authMiddleware, programController.deleteProgram);

module.exports = router;
