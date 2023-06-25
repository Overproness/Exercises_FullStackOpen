const LoginForm = (props) =>(
    <>
        <h2>Login</h2>
        <form onSubmit={props.handleLoginFormSubmit}>
            <p>username: <input value={props.username} type="text" onChange={props.usernameChange} name="Username" /></p>
            <p>password: <input value={props.password} onChange={props.passwordChange} type="password" name="Password" /></p>
            <button type="submit">Login</button>
        </form>
    </>
)

export default LoginForm