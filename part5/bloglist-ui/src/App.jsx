import { useEffect, useState } from 'react'

import Blog from '../components/Blog'
import BlogEntry from '../components/BlogEntry'
import blogService from '../services/blogs'
import loginService from '../services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [newBlog, setNewBlog] = useState(null)

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			setBlogs(blogs)
		})
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)

		try {
			const user = await loginService.login({ username, password })
			setUser(user)
			blogService.setToken(user.token)
			setUsername('')
			setPassword('')
			console.log(user)
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const addBlog = (e) => {
		e.preventDefault()
		const blog = {
			title: title,
			author: author,
			url: title,
			likes: 0,
			user: user.id,
		}
		blogService.create(blog).then((blog) => {
			setBlogs([...blogs, blog])
		})
	}

	const loginForm = () => (
		<form className="flex flex-col" onSubmit={handleLogin}>
			<label htmlFor="username">Username</label>
			<input
				type="text"
				id="username"
				value={username}
				onChange={(event) => setUsername(event.target.value)}
			/>
			<label htmlFor="password">Password</label>
			<input
				type="password"
				id="password"
				value={password}
				onChange={(event) => setPassword(event.target.value)}
			/>
			<button type="submit">Login</button>
		</form>
	)

	const blogForm = () => (
		<>
			<ul className="border-2 border-solid border-red-500 text-blue-500">
				{blogs.map((blog) => (
					<li className="border-solid " key={blog.id}>
						{blog.author}: {blog.title}
					</li>
				))}
			</ul>
			<form onSubmit={addBlog} className="flex flex-col">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label htmlFor="author">Author</label>
				<input
					type="text"
					id="author"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>

				<button type="submit">save</button>
			</form>
		</>
	)

	return (
		<>
			<h1 className="text-center">Bloglist</h1>
			{user === null ? (
				<div>{loginForm()}</div>
			) : (
				<div>
					<p>{user.username}</p>
					{blogForm()}
				</div>
			)}
		</>
	)
}

export default App
