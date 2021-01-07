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
        <form>
            <h1>Log in to application</h1>
            <label for="username">Username</label>
            <input type="text" id="username" onChange={onUsernameInputHandler}></input><br />
            <label for="password">password</label>
            <input type="password" id="password" onChange={onPasswordInputHandler}></input><br />
            <button type="button" onClick={onLoginClickHandler}>Login</button>
        </form>
    )
}

export default LoginForm;