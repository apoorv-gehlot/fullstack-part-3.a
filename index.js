const express = require('express')
const app = express()
const cors = require('cors')
const personRouter = require('./controller/person')
const morgan = require('morgan')
morgan.token('body', (req, res) => JSON.stringify(req.body));
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info('Connected to MonoDB')
}).catch((error) => {
    logger.error('Error while connecting to MongoDB', error.message)
})

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'))

app.use('/api/persons', personRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
    logger.info(`Server is running on port ${config.PORT}`)
})
