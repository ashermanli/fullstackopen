const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []
	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

test('returns author with most blogs', async () => {
	const blogs = listHelper.blogs

	const result = listHelper.mostBlogs(blogs)
	expect(result).toBe('Edsger W. Dijkstra')


})



test('returns author with most likes', async () => {
	const blogs = listHelper.blogs


	const result = listHelper.mostLikes(blogs)
	expect(result).toBe('the greatest')


})