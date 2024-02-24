const LoginForm = ({
	username,
	password,
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
}) => {
	return (
		<div>
			<h2>This is the login</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<input value={username} onChange={handleUsernameChange} />
					<input
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
