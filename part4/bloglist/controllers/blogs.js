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

	let user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		likes: body.likes ? body.likes: 0,
		user:user,
		...body
	})

	console.log('user: ', user)

	const savedBlog = await blog.save()
	console.log('saved blog: ', savedBlog)
	user.blogs = user.blogs.concat(savedBlog.id)
	await user.save()
	console.log('user after concat: ', user)
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
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	console.log('decoded token : ', decodedToken)
	if(!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	console.log('request: ', request.params)
	const stagedBlog = await Blog.findById(request.params.id)
	console.log('route search for id: ', stagedBlog)
	//const id = request.params.id

	const result = await Blog.findByIdAndRemove(stagedBlog)



	response.status(204).json(result).end()
})

module.exports = blogsRouter