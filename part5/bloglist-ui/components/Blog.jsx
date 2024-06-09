import { useState } from 'react'

useState
const Blog = ({ blog, removeBlog, addLike, user }) => {
	const [showDetails, setShowDetails] = useState(false)

	const increaseLike = (blog) => {
		addLike(blog)
	}

	return (
		<>
			<span>Title: {blog.title}</span>
			{showDetails === false ? (
				''
			) : (
				<>
					<span>Author: {user.name}</span>
					<span>url: {blog.url}</span>
					<span>Likes: {blog.likes}</span>
					<button onClick={() => removeBlog(blog)}>Delete</button>
					<button onClick={() => increaseLike(blog)}>UPlike</button>
				</>
			)}

			<button onClick={() => setShowDetails(!showDetails)}>Details</button>
		</>
	)
}

export default Blog
