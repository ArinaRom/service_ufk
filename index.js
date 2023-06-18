require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
}))

app.use(express.json())
app.use('/api', router)

app.options('*', cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
}));

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, console.log(`server has been started on port: ${PORT}`));

    } catch (e) {
        console.log(e)
    }
}

start()
