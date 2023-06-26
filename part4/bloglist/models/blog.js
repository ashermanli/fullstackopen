const mongoose = require('mongoose')

//Schema for the blog post
const blogSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: String,
	url: { type: String, required: true },
	likes: Number

})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)