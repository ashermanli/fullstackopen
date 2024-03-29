const helper = require('../utils/list_helper')
const totalLikes = helper.totalLikes
const blogs = helper.blogs
const oneBlog = blogs[0]

describe('total blog likes', () => {
	test('for one blog', () => {
		expect(totalLikes(oneBlog)).toBe(10)
	})

	test('for many blogs', () => {
		expect(totalLikes(blogs)).toBe(13786)
	})

	test('for no blogs', () => {
		expect(totalLikes([])).toBe(0)
	})
})
