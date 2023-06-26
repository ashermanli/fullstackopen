const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Default page
blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
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

	const blog = new Blog({
		title: body.title,
		likes: body.likes ? body.likes: 0
	})

	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const id = request.params.id

	const result = await Blog.findByIdAndRemove(id)

	console.log(result)
	console.log('item has been deleted')

	response.status(204).end()
})

module.exports = blogsRouter