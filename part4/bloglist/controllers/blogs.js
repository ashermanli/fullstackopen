const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//Default page
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

	response.json(blogs)
	//response.send('<h1>Hello world test</h1>')
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)

	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	let userHeaderID

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	if (!request.user) {
		return response.status(401).json({ error: 'missing user header' })
	} else userHeaderID = request.user

	let user = await User.findById(userHeaderID)

	const blog = new Blog({
		title: body.title,
		likes: body.likes ? body.likes : 0,
		user: userHeaderID,
		...body,
	})

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const blogUpdate = {
		likes: body.likes,
		...body,
	}

	const updateBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		blogUpdate,
		{ new: 'true' }
	)

	response.status(200).json(updateBlog).end()
})

blogsRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	let userHeaderID

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	if (!request.user) {
		return response.status(401).json({ error: 'missing user header' })
	} else userHeaderID = request.user

	let user = await User.findById(userHeaderID)

	const stagedBlog = await Blog.findById(request.params.id)

	const result = await Blog.findByIdAndRemove(stagedBlog)

	user.blogs = await Blog.find({})
	await user.save()

	response.status(204).json(result).end()
})

module.exports = blogsRouter
