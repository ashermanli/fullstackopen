import { useEffect, useState } from 'react'

import Blog from '../components/Blog'
import BlogEntry from '../components/BlogEntry'
import blogService from '../services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			setBlogs(blogs)
		})
	})

	const handleLogin = (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
	}

	return (
		<>
			<h1 className="text-center">App Body</h1>
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
			<div></div>-
		</>
	)
}

export default App
