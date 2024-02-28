import { useState } from 'react'

useState
const Blog = ({ blog, removeBlog }) => {
	const [showDetails, setShowDetails] = useState(false)

	return (
		<>
			<span>Title: {blog.title}</span>
			{showDetails === false ? (
				''
			) : (
				<>
					<span>Author: {blog.author}</span>
					<button onClick={() => removeBlog(blog)}>Delete</button>
				</>
			)}

			<button onClick={() => setShowDetails(!showDetails)}>Details</button>
		</>
	)
}

export default Blog
