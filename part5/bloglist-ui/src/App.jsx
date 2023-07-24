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
	// const [errorMessage, setErrorMessage] = useState('')
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			setBlogs(blogs)
		})

		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const JSONUser = JSON.parse(loggedUserJSON)
			setUser(JSONUser)
			blogService.setToken(JSONUser.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)

		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
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

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser')
		setUser(null)
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
		setTitle('')
		setAuthor('')
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
			<ul className="  flex w-[500px] shrink flex-wrap justify-center  text-blue-500">
				{blogs.map((blog) => (
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
			<form onSubmit={addBlog} className="flex flex-col">
				<label htmlFor="title">Title</label>
				<input
					className="border-2 border-solid border-gray-400"
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label htmlFor="author">Author</label>
				<input
					className="border-2 border-solid border-gray-400"
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
		<div className="flex w-screen flex-col justify-center">
			{user === null ? (
				<div className="grid w-screen grid-cols-3 px-2">
					<div></div>
					<h1>Please login</h1>
					<div></div>
				</div>
			) : (
				<div className="grid w-screen grid-cols-3 px-2">
					<h1>Welcome to my Blog</h1>
					<h2 className="text-center">{user.username}</h2>
					<button
						className="justify-self-end"
						type="submit"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			)}

			<div className="flex justify-center">
				{user === null ? (
					<div>{loginForm()}</div>
				) : (
					<div>
						<p>{user.username}</p>
						{blogForm()}
					</div>
				)}
			</div>
		</div>
	)
}

export default App
