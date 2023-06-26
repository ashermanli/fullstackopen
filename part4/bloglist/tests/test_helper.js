const Blog = require('../models/blog')

const initialBlogs = [
	{
		'title': 'Ziran',
		'author': 'The tester',
		'url': 'across the universe',
		'likes': 1
	},
	{
		'title': 'Eo',
		'author': 'The what',
		'url': 'philadelpia',
		'likes': 1
	}
]

const nonExistingBlog = async () => {
	const blog = new Blog({ title: 'willremovethissoon' })
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, nonExistingBlog, blogsInDb
}