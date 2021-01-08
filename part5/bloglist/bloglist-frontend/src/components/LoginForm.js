import React, { useState, useEffect } from 'react';

const LoginForm = ({ submitLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameInputHandler = (event) => {
        setUsername(event.target.value);
    }

    const onPasswordInputHandler = (event) => {
        setPassword(event.target.value);
    }

    const onLoginClickHandler = () => {
        submitLogin({ username, password });
    }

    return (
        <form data-testid="login-form">
            <h1>Log in to application</h1>
            <label htmlFor="username">Username</label>
            <input data-testid="input-username" type="text" id="username" onChange={onUsernameInputHandler}></input><br />
            <label htmlFor="password">password</label>
            <input data-testid="input-password" type="password" id="password" onChange={onPasswordInputHandler}></input><br />
            <button data-testid="login-button" type="button" onClick={onLoginClickHandler}>Login</button>
        </form>
    )
}

export default LoginForm;