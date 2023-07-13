import { useState } from 'react'

import Blog from '../components/Blog'
import BlogEntry from '../components/BlogEntry'

const App = () => {
	let [count, setCount] = useState(0)

	return (
		<>
			<h1>App Body</h1>
			<Blog>
				<BlogEntry
					title={count}
					handleRemove={() => setCount(count + 1)}
				></BlogEntry>
			</Blog>
			<BlogEntry
				title={count}
				handleRemove={() => setCount(count + 1)}
			></BlogEntry>
		</>
	)
}

export default App
