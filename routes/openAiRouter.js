const express = require('express');
const router = express.Router();
const openAiController = require('../controllers/openAiController');
const authMiddleware = require('../middleware/authMiddleware')

// POST /api/openai/generateArray - Создать JSON на оснве запроса
router.post('/generateArray', authMiddleware, openAiController.generateArray);

router.post('/classifyProblem', openAiController.classifyProblem);

module.exports = router;
