const Router = require('express')
const router = new Router()

const applicationRouter = require('./applicationRouter')
const programRouter = require('./programRouter')
const subsystemRouter = require('./subsystemRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/applications', applicationRouter)
router.use('/programs', programRouter)
router.use('/subsystems', subsystemRouter)
router.use('/types', typeRouter)

module.exports = router
