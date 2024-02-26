import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
	const [blogs, setBlogs] = useState([])
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')

	const addBlog = (e) => {
		e.preventDefault()

		const blog = {
			title: title,
			author: author,
			url: title,
			likes: 0,
		}
		setBlogs(blog)

		createBlog(blog)

		setTitle('')
		setAuthor('')
	}

	/*const blogForm = () => (
		<>
			<ul className="  flex w-[500px] shrink flex-wrap justify-center  text-blue-500">
				{userBlogs.map((blog) => (
					<li
						className="m-2 flex basis-1/3  flex-col border-2 border-solid border-red-700 bg-slate-800"
						key={blog.blogId}
					>
						<span>Title: {blog.title}</span>
						<span>Author: {blog.author}</span>
						<button>Delete</button>
					</li>
				))}
			</ul>
		</>
	)
    */

	return (
		<div>
			<h2 className="text-7xl">Create a new note</h2>
			<form onSubmit={addBlog}>
				<input
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/>
				<input
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
				<button type="submit">save</button>
			</form>
		</div>
	)
}

export default BlogForm
