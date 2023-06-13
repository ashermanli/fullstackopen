const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//Schema for the blog post
const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String, 
	likes: Number

})

const params = {
	useNewUrlParser: true,
	useUnifiedTopology: true ,
	dbName: 'phonebook-app'
  }

const Blog = mongoose.model('Blog', blogSchema)

//Connection string and instance
const mongoURL = 'mongodb+srv://m001-student:testpassword@sandbox.lmfsq.mongodb.net/phonebook-app?retryWrites=true&w=majority'
// const mongoURL = 'mongodb://localhost/bloglist'
const dbConnection = mongoose.connect(mongoURL, params)
.then(console.log('connected to mongodb'))
.catch((e) => {
	console.log('couldnt connect', e)
})

// const connectToMongo = async () => {
// 	try {
// 	  await mongoose.connect(mongoURL, { useNewUrlParser: true });
// 	  console.log('connected to MongoDB');
// 	} catch(error) {
// 	  console.log('error connection to MongoDB:', error.message);
// 	}
//   };

app.use(cors())
app.use(express.json())

//Default page
app.get('/', (request, response) =>{
	response.send('<h1>Hello world</h1>')
})

app.get('/api/blogs', (request, response) =>{
	Blog.find({})
	.then(blogs => {
		console.log(blogs)
		response.json(blogs)
	})
})

app.post('/api/blogs', (request, response)=>{
	const blog = new Blog(request.body)

	blog.save()
	.then(result =>{
		response.status(201).json(result)
	})
})

const PORT = 3003

app.listen(PORT, () =>{
	console.log(`Server running on port ${PORT}`)
})
