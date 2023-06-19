const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

mongoose.set('bufferTimeoutMS', 30000)

const api = supertest(app)

test('blog are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
	const response = await api.get('/api/blogs')
	console.log(response.body)

	expect(response.body).toHaveLength(2)
}, 100000)

test('the first note is about eo', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body[0].title).toBe('testeo')
})

afterAll(async () => {
	await mongoose.connection.close()
})