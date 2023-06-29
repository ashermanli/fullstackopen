const logger = require('./logger')

const requestLogger = (request, response, next) => {
	logger.info('Method: ', request.method)
	logger.info('Path: ', request.path)
	logger.info('Body: ', request.body)
	logger.info('---')
	next()
}

const tokenExtractor = (request, response, next) => {

	let authorization = request.get('authorization')
	if(authorization && authorization.startsWith('Bearer')){
		authorization = authorization.replace('Bearer ', '')
		request.token = authorization

	}
	next()

}

const userExtractor = (request, response, next) => {
	let user = request.get('user')
	if(user) {
		request.user = user
	}
	next()
}

const errorHandler = (error, request, response, next) => {

	logger.error('this is the error: ', error.message)

	if(error.name === 'CastError'){
		return response.status(400).send({ error: 'malformatted id' })
	}else if (error.name === 'ValidationError'){
		return response.status(400).send({ error: error.message })
	}else if (error.name === 'JsonWebTokenError'){
		return response.status(401).json({ error: 'invalid token' })
	}else if (error.name === 'TokenExpiredError'){
		return response.status(401).json({ error: 'token expired' })
	}
	next(error)
}



const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}