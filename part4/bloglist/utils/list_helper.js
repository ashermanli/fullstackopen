const blogs = [
	{
		'title': 'eo',
		'author': 'the omnipotent',
		'url': 'eo.com',
		'likes': 100
	},

	{
		'title': 'yuki',
		'author': 'the yeeter',
		'url': 'yeet.com',
		'likes': 3215
	},

	{
		'title': 'toph',
		'author': 'the greatest',
		'url': 'earthbending.com',
		'likes': 10500
	},

	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
]



const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	let sum = 0
	if(Array.isArray(blogs)) {
		blogs.forEach(blog => sum = sum + blog.likes)
		return blogs.length === 0
			? 0
			: sum

	}
	else{
		return blogs.likes
	}


}

const favoriteBlog = (blogs) => {
	if(Object.keys(blogs).length === 0) return blogs
	console.log('hello')
	let max =  0
	let favorite = {}
	blogs.forEach(blog => {
		if(blog.likes > max){
			//const {title, author, likes} = blog
			max = blog.likes
			let { title, author, likes } = blog
			favorite.title = title
			favorite.author = author
			favorite.likes = likes
		}
	})

	console.log(favorite)
	return favorite
}

module.exports = {
	dummy,
	blogs,
	totalLikes,
	favoriteBlog
}