import React, { useState, useEffect } from 'react';

const CreateBlogForm = ({ submitBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const onTitleInputHandler = (event) => {
        setTitle(event.target.value);
    }

    const onAuthorInputHandler = (event) => {
        setAuthor(event.target.value);
    }

    const onUrlInputHandler = (event) => {
        setUrl(event.target.value);
    }

    const onSubmitBlogClickHandler = () => {
        submitBlog({ title, author, url });
    }

    return (
        <form>
            <h1>create new blog</h1>
            <label for="title">title</label>
            <input type="text" id="title" onChange={onTitleInputHandler}></input><br />
            <label for="author">author</label>
            <input type="text" id="author" onChange={onAuthorInputHandler}></input><br />
            <label for="url">url</label>
            <input type="text" id="url" onChange={onUrlInputHandler}></input><br />
            <button type="button" onClick={onSubmitBlogClickHandler}>Create</button><br />
        </form>
    )
}

export default CreateBlogForm;