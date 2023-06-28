const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')


//Connection string and instance
const mongoURL = config.MONGODB_URI
// const mongoURL = 'mongodb://localhost/bloglist'
mongoose.connect(mongoURL)
	.then(() => logger.info('connected to mongodb'))
	.catch((e) => {
		logger.error('couldnt connect', e)
	})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

//for router to be used, url starts with /api/blogs
//e.g. localhost:3005/api/blogs
app.use('/api/blogs', blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app