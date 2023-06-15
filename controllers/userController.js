const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/index')

const createToken = (id, login) => {
    return jwt.sign({id, login}, process.env.SECRET_KEY,{expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {login, password} = req.body
        if (!login || !password) {
            return res.status(400).json({ error: 'Некорректный login или password' });
        }
        const findUser = await User.findOne({where: {login}})
        if (findUser) {
            return res.status(400).json({ error: 'Пользователь с таким login уже существует' });
        }

        const hash = await bcrypt.hash(password, 4)
        const user = await User.create({login, password: hash})
        const token = createToken(user.id, user.login)
        return res.status(200).json({ token: token });
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return res.status(400).json({ error: 'Пользователь не найден' });
        }
        let checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ error: 'Указан неверный пароль' });
        }
        const token = createToken(user.id, user.login)
        return res.status(200).json({ token: token });
    }

    async check(req, res, next) {
        // const token = createToken(req.user.id, req.user.login)
        return res.json({ token: req.token });
    }
}

module.exports = new UserController()
