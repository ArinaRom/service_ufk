const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware')

// POST /api/applications - Создать новое заявление
router.post('/', applicationController.createApplication);

// PUT /api/applications - Обновить заявление
router.put('/', applicationController.editApplication);

// PUT /api/applications/status - Установить статус заявления
router.put('/status', applicationController.setStatusApplication);

// DELETE /api/applications - Удалить заявление
router.delete('/', applicationController.deleteApplication);

// GET /api/applications - Получить все заявления
router.get('/', applicationController.getAllApplications);

module.exports = router;
