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
            <label htmlFor="title">title</label>
            <input data-testid="input-title" type="text" id="title" onChange={onTitleInputHandler}></input><br />
            <label htmlFor="author">author</label>
            <input data-testid="input-author" type="text" id="author" onChange={onAuthorInputHandler}></input><br />
            <label htmlFor="url">url</label>
            <input data-testid="input-url" type="text" id="url" onChange={onUrlInputHandler}></input><br />
            <button data-testid="button-create-blog" type="button" onClick={onSubmitBlogClickHandler}>Create</button><br />
        </form>
    )
}

export default CreateBlogForm;