const helper = require('../utils/list_helper')
const favoriteBlog = helper.favoriteBlog

describe('The favorite blog', () => {
	test('for a list of blogs', () => {
		expect(favoriteBlog(helper.blogs)).toEqual(
			{
				'title': 'toph',
				'author': 'the greatest',
				'likes': 10500
			}
		)
	})

	test('for no blogs', () => {
		expect(favoriteBlog({})).toEqual({})
	})
})