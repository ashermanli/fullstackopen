const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if(!username){
		return response.status(401).json({ error: 'missing username' })
	} else if (username.length < 3) {
		return response.status(401).json({ error: 'username should be at least 3 characters' })
	}

	if(!password){
		return response.status(401).json({ error: 'missing password' })
	}else if (password.length< 3) {
		return response.status(401).json({ error: 'password should be at least 3 characters' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password,saltRounds)

	const user = new User({
		username,
		name,
		passwordHash
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
	const result = await User.find({}).populate('blogs')

	response.json(result)
})

module.exports = usersRouter

