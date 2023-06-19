const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Default page
blogsRouter.get('/', (request, response) => {
	Blog.find({})
		.then(blogs => {
			//console.log(blogs)
			response.json(blogs)
		})
	//response.send('<h1>Hello world test</h1>')
})

/*blogsRouter.get('/api/blogs', (request, response) => {
	Blog.find({})
		.then(blogs => {
			console.log(blogs)
			response.json(blogs)
		})
})*/

blogsRouter.post('/', (request, response) => {

	const blog = new Blog(request.body)

	blog.save()
		.then(result => {
			response.status(201).json(result)
		})
})

module.exports = blogsRouter