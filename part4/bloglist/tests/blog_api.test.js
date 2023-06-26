const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
mongoose.set('bufferTimeoutMS', 30000)

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))

	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)


},100000)

describe('when there is initially some blogs saved', () => {

	test('blog are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	}, 100000)

	test('a unique identifier is present', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body[0].id).toBeDefined()
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		//console.log(response.body)

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	}, 100000)

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const contents = response.body.map(r => r.title)
		expect(contents).toContain('Ziran')
	})
})

describe('viewing a specific blog', () => {
	test('succeeds with a valid id', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const blogToView = blogsAtStart[0]

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(resultBlog.body).toEqual(blogToView)
	}, 100000)

	test('fails with 404 if it does not exist', async () => {
		const invalid = await helper.nonExistingBlog()
		console.log(helper.nonExistingBlog())
		await api
			.get(`/api/blogs/${invalid}`)
			.expect(404)
	})

	test('fails with statuscode 400 if id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445'

		await api
			.get(`/api/blogs/${invalidId}`)
			.expect(400)
	})
})

describe('adding a new blog', () => {
	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'async/await simplifies making async calls',
			url: 'async',
			likes: 100
		}

		await api.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)


		const title = blogsAtEnd.map(b => b.title)
		expect(title).toContain('async/await simplifies making async calls')
	})

	test('the number of likes is updated', async () => {
		const blogsAtStart =  await helper.blogsInDb()
		const newBlog = {
			...blogsAtStart[0],
			likes:25
		}

		await api
			.put(`/api/blogs/${blogsAtStart[0].id}`)
			.send(newBlog)
			.expect(200)
	})

	test('blog without url is not added', async () => {
		const noURL = {
			title: 'no-url',
			likes: 10
		}

		await api
			.post('/api/blogs')
			.send(noURL)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	},100000)

	test('blog without title is not added', async () => {
		const noTitle = {
			url: 'no-title',
			likes:25
		}

		await api
			.post('/api/blogs')
			.send(noTitle)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	},100000)


})



describe('deletion of a blog', () => {
	test('Succeeds with status 204 if valid id', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length -1)

		const title = blogsAtEnd.map(b => b.title)

		expect(title).not.toContain(blogToDelete.title)
	})

})



afterAll(async () => {
	await mongoose.connection.close()
})