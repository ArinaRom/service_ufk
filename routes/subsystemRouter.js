const express = require('express');
const router = express.Router();
const subsystemController = require('../controllers/subsystemController');
const authMiddleware = require('../middleware/authMiddleware')

// GET /api/subsystems - Получить все подсистемы
router.get('/', subsystemController.getAllSubsystems);

// POST /api/subsystems - Создать новую подсистему
router.post('/', authMiddleware, subsystemController.createSubsystem);

// PUT /api/subsystems - Изменить подсистему
router.put('/', authMiddleware, subsystemController.editSubsystem);

// DELETE /api/subsystems - Удалить подсистему
router.delete('/', authMiddleware, subsystemController.deleteSubsystem);

module.exports = router;
