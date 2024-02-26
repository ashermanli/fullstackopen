const LoginForm = ({
	username,
	password,
	handleLogin,
	handleUsernameChange,
	handlePasswordChange,
}) => {
	return (
		<div>
			<h2>This is the login</h2>

			<form onSubmit={handleLogin}>
				<div className="flex flex-col justify-between">
					<input
						className="border-2"
						value={username}
						onChange={handleUsernameChange}
					/>
					<input
						className="border-2"
						value={password}
						type="password"
						onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm
