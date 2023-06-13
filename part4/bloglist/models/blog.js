const mongoose = require('mongoose')

//Schema for the blog post
const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String, 
	likes: Number

})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.__id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)