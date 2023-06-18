const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware')

// POST /api/applications - Создать новое заявление
router.post('/', applicationController.createApplication);

// PUT /api/applications - Обновить заявление
router.put('/', authMiddleware, applicationController.editApplication);

// PUT /api/applications/status - Установить статус заявления
router.put('/status', authMiddleware, applicationController.setStatusApplication);

// DELETE /api/applications - Удалить заявление
router.delete('/', authMiddleware, applicationController.deleteApplication);

// GET /api/applications - Получить все заявления
router.get('/', authMiddleware, applicationController.getAllApplications);

// POST /api/applications/getById - Получить заявление по id
router.post('/getById', authMiddleware, applicationController.getApplicationsById);

module.exports = router;
