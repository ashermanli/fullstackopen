const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



//Default page
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username:1, name: 1 })
	response.json(blogs)
	//response.send('<h1>Hello world test</h1>')
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)

	if(blog){
		response.json(blog)
	}
	else {
		response.status(404).end()
	}
})


blogsRouter.post('/', async (request, response) => {

	const body = request.body
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if(!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		likes: body.likes ? body.likes: 0,
		user:user,
		...body
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const blogUpdate = {
		likes : body.likes,
		...body
	}

	const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blogUpdate, { 'new':'true' })

	response.status(200).json(updateBlog).end()
})

blogsRouter.delete('/:id', async (request, response) => {
	const id = request.params.id

	const result = await Blog.findByIdAndRemove(id)

	console.log(result)
	console.log('item has been deleted')

	response.status(204).end()
})

module.exports = blogsRouter