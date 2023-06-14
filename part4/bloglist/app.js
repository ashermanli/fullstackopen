const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)
const params = {
	useNewUrlParser: true,
	useUnifiedTopology: true ,
	dbName: 'phonebook-app'
}



//Connection string and instance
const mongoURL = config.MONGODB_URI
// const mongoURL = 'mongodb://localhost/bloglist'
mongoose.connect(mongoURL, params)
	.then(() => logger.info('connected to mongodb'))
	.catch((e) => {
		logger.error('couldnt connect', e)
	})



app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app