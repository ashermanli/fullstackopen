const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const _ = require('lodash')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
mongoose.set('bufferTimeoutMS', 30000)

const api = supertest(app)
let userToken
let user

beforeEach(async () => {
	await Blog.deleteMany({})

	const users = await helper.usersInDb()
	let activeUser = users[0]
	activeUser = { ...activeUser, password: 'test' }

	const fetchUser = await api
		.post('/api/login')
		.send(activeUser)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	userToken = fetchUser.body.token

	user = await User.findOne(activeUser)

	//grab the hard coded blogs from the helper file that will be used for testing, and associate them with a user
	const blogObjects = helper.initialBlogs.map(
		(blog) => (blog = { ...blog, user: user.id })
	)
	await Promise.all(blogObjects)

	//save the blogs to the mongodb database
	const mongoObjArray = blogObjects.map(async (blog) => {
		blog = new Blog(blog)
		await blog.save()
	})
	await Promise.all(mongoObjArray)

	//fetch modified blogs from database and associate the blogs to the user
	const modBlogs = await helper.blogsInDb()
	modBlogs.forEach((blog) => {
		user.blogs = modBlogs
		user.blogs = user.blogs.concat(blog.blogId)
	})

	await user.save()

	// try{
	// const savedArray = await promiseArray.forEach(blog => blog.save())
	// } catch(error) {throw error}
}, 100000)

describe('when there is initially some blogs saved', () => {
	test('blog are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	}, 100000)

	test('a unique identifier is present', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body[0].blogId).toBeDefined()
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	}, 100000)

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const contents = response.body.map((r) => r.title)
		expect(contents).toContain('Blog1')
	})
})

describe('viewing a specific blog', () => {
	test('succeeds with a valid id', async () => {
		const blogsAtStart = await helper.blogsInDb()

		let blogToView = blogsAtStart[0]
		blogToView = {
			...blogToView,
			user: user.id.toString(),
			blogId: blogToView.blogId.toString(),
		}

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.blogId}`)
			.set('authorization', `Bearer ${userToken}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(resultBlog.body).toEqual(blogToView)
	}, 100000)

	test('fails with 404 if it does not exist', async () => {
		const invalid = await helper.nonExistingBlog()
		await api.get(`/api/blogs/${invalid}`).expect(404)
	})

	test('fails with statuscode 400 if id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445'

		await api.get(`/api/blogs/${invalidId}`).expect(400)
	})
})

describe('adding a new blog', () => {
	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'async/await simplifies making async calls',
			url: 'async',
			likes: 100,
			user: user.id,
		}

		await api
			.post('/api/blogs')
			.set('authorization', `Bearer ${userToken}`)
			.set('user', user.id)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const title = blogsAtEnd.map((b) => b.title)
		expect(title).toContain('async/await simplifies making async calls')
	})

	test('the number of likes is updated', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const newBlog = {
			...blogsAtStart[0],
			likes: 25,
			user: user.id,
		}

		await api
			.put(`/api/blogs/${blogsAtStart[0].blogId}`)
			.set('authorization', `Bearer ${userToken}`)
			.send(newBlog)
			.expect(200)
	})

	test('blog without url is not added', async () => {
		const noURL = {
			title: 'no-url',
			likes: 10,
			user: user.id,
		}

		await api
			.post('/api/blogs')
			.set('authorization', `Bearer ${userToken}`)
			.set('user', user.id)
			.send(noURL)
			.expect(400)
		// .end((err, res) => {
		// 	if(err) throw err
		// })

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	}, 100000)

	test('blog without title is not added', async () => {
		const noTitle = {
			url: 'no-title',
			likes: 25,
			user: user.id,
		}

		await api
			.post('/api/blogs')
			.set('authorization', `Bearer ${userToken}`)
			.set('user', user.id)
			.send(noTitle)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	}, 100000)
})

describe('deletion of a blog', () => {
	test('Succeeds with status 204 if valid id', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		if (!blogsAtStart)
			expect(blogToDelete.user.toString()).toContain(user.id)

		await api
			.delete(`/api/blogs/${blogToDelete.blogId}`)
			.set('user', user.id)
			.set('authorization', `Bearer ${userToken}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

		const title = blogsAtEnd.map((b) => b.title)

		expect(title).not.toContain(blogToDelete.title)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
