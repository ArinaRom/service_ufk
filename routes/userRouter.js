const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// POST /api/user/registration - Зарегистрировать пользователя
router.post('/registration', userController.registration)

// POST /api/user/login - Авторизоваться под новый пользователем
router.post('/login', userController.login)

// GET /api/user/auth - Проверить авторизацию пользователя
router.get('/auth', authMiddleware, userController.check)

module.exports = router
