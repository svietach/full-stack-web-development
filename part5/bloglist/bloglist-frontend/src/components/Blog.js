import React, { useState, useEffect } from 'react';
import { getAll, updateBlog, deleteBlog } from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, setBlogs, user }) => {
    const [isBlogShown, setIsBlogShown] = useState(false);

    const onViewClickHandler = () => {
        setIsBlogShown(true);
    }

    const onLikeClickHandler = () => {
        updateBlog({
            id: blog._id,
            title: blog.title,
            author: blog.author,
            likes: blog.likes + 1,
            url: blog.url,
        }).then((data) => {
            getAll().then(blogs =>
                setBlogs(blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
            );
        });
    }

    const onDeleteClickHandler = () => {
        const isConfirmed = window.confirm("Remove blog " + blog.title + ' by ' + blog.author);
        if (isConfirmed) {
            deleteBlog({ id: blog._id }).then((data) => {
                console.log(data);
                getAll().then(blogs =>
                    setBlogs(blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
                );
            }).catch((error) => console.log(error));
        }
    }

    return (
        <div className="blog-section">
            <div data-testid="title">{blog.title}</div> <div data-testid="author" className="my-best-classname-in-da-world">{blog.author}</div> <button type="button" data-testid="button-view" onClick={onViewClickHandler}>view</button><br />
            {isBlogShown && (
                <>
                    <div data-testid="url">{blog.url}</div> <br />
                    <div data-testid="likes">likes {blog.likes}</div> <button type="button" data-testid="button-like" onClick={onLikeClickHandler}>like</button><br />
                    {user.username == blog?.user?.username && <button type="button" data-testid="button-remove" onClick={onDeleteClickHandler}>remove</button>}
                </>
            )}
        </div>
    );
}

Blog.propTypes = {
    blog: PropTypes.object,
    user: PropTypes.object,
    setBlogs: PropTypes.func,
}

export default Blog;