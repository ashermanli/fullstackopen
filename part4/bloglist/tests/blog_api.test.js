const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
mongoose.set('bufferTimeoutMS', 30000)

const api = supertest(app)

const initialBlogs = [
	{
		'title': 'Ziran',
		'author': 'The tester',
		'url': 'across the universe',
		'likes': 1
	},
	{
		'title': 'Ziran',
		'author': 'The tester',
		'url': 'across the universe',
		'likes': 1
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject = new Blog(initialBlogs[0])
	await blogObject.save()

	blogObject = new Blog(initialBlogs[1])
	await blogObject.save()
},100000)


test('blog are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	console.log(response.body)

	expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)

test('a specific blog is within the returned blogs', async () => {
	const response = await api.get('/api/blogs')

	const contents = response.body.map(r => r.title)
	expect(contents).toContain('Ziran')
})

afterAll(async () => {
	await mongoose.connection.close()
})