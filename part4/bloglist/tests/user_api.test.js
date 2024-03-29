const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('test', 10)
		const user = new User({ username:'test',passwordHash })
		await user.save()
	}, 100000)

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	}, 100000)

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'test',
			name: 'Superuser test',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('expected `username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	}, 100000)

	test('creation fails if missing username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'missingUser',
			password: 'noUser'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('missing username')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('creation fails if missing password', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'missingPass',
			username: 'noPass'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('missing password')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('creation fails if username is less than 3 characters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username:'no',
			name: 'missingcharacters',
			password: 'noUser'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username should be')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('creation fails if password is less than 3 characters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'shortPass',
			name: 'missingPassChar',
			password: 'no'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(401)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password should be')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})
})

