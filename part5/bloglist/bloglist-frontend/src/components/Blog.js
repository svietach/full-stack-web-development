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
            {blog.title} {blog.author} <button type="button" onClick={onViewClickHandler}>view</button><br />
            {isBlogShown && (
                <>
                    {blog.url} <br />
                    likes {blog.likes} <button type="button" onClick={onLikeClickHandler}>like</button><br />
                    {user.username == blog?.user?.username && <button type="button" onClick={onDeleteClickHandler}>remove</button>}
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