import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import { getAll, submitBlog } from './services/blogs';
import { login } from './services/users';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')) || {});
  const [message, setMessage] = useState({});
  const [isCreateBlogShown, setIsCreateBlogShow] = useState(false);

  useEffect(() => {
    getAll().then(blogs =>

      setBlogs(blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
    )
  }, []);

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const onSubmitLogin = ({ username, password }) => {
    login({ username, password }).then(data => {
      setUser(data);
    }).catch((error) => {
      console.log(error.message);
      setMessage({
        color: `red`,
        text: 'wrong password or username',
      })
    })
  }

  const onLogoutClick = () => {
    setUser({});
  }

  const onSubmitBlog = ({ title, author, url }) => {
    submitBlog({ title, author, url }).then((data) => {
      setMessage({
        color: `green`,
        text: 'a new blog ' + title + ' by ' + author + ' added'
      })
    });
  }

  return (
    <div>
      {!!Object.keys(message).length ? (
        <p data-testid="message" className={`message-${message.color}`}>{message.text}</p>
      ) : null}
      {!!Object.keys(user).length ? (<>
        <h2 data-testid="title-blogs">blogs</h2>
        <p>{user.name} logged in <button data-testid="logout-button" type="button" onClick={onLogoutClick}>logout</button></p><br />
        {isCreateBlogShown && <CreateBlogForm submitBlog={onSubmitBlog} />}
        <button data-testid="show-blog-creation-button" type="button" onClick={() => {
          setIsCreateBlogShow(prevState => !prevState);
        }}>{isCreateBlogShown ? 'cancel' : 'create new blog'}</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
        )}
      </>) : <LoginForm submitLogin={onSubmitLogin} />}

    </div>
  )
}

export default App