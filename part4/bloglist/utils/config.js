require('dotenv').config()

const PORT = process.env.FLAG === 'monitor'
	? process.env.MONITOR
	: process.env.PORT

const MONGODB_URI =  process.env.NODE_ENV === 'test' || process.env.FLAG === 'monitor'
	? process.env.TEST_MONGODB_URI
	: process.env.MONGODB_URI

module.exports = {
	MONGODB_URI,
	PORT
}