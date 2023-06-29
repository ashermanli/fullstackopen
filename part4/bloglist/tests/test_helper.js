const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		'title': 'Blog1',
		'author': 'generic',
		'url': 'generic',
		'likes': 1
	},
	{
		'title': 'Blog2',
		'author': 'generic',
		'url': 'generic',
		'likes': 2
	}
]

const nonExistingBlog = async () => {
	const blog = new Blog({ title: 'willremovethissoon', url:'willremovesoon.com' })
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initialBlogs, nonExistingBlog, blogsInDb, usersInDb
}