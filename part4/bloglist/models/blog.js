const mongoose = require('mongoose')

//Schema for the blog post
const blogSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: String,
	url: { type: String, required: true },
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.blogId = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model('Blog', blogSchema)
