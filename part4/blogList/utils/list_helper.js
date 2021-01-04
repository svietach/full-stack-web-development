const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const sumLikes = blogs.reduce((acc, blog) => {
        acc += blog.likes;
        return acc;
    }, 0);

    return sumLikes;
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((prevBlog, currentBlog) => {
        return (prevBlog.likes > currentBlog.likes) ? prevBlog : currentBlog;
    });

    return mostLikes;
}

const mostBlogs = (blogs) => {
    const blogsCount = _.countBy(blogs, 'author');
    return _.maxBy(Object.keys(blogsCount).map((key) => ({ author: key, blogs: blogsCount[key] })), 'blogs');
}

const mostLikes = (blogs) => {
    const mostLikes = _(blogs).groupBy('author').map((author, id) => ({
        author: id,
        likes: _.sumBy(author, 'likes')
    })).value();
    return _.maxBy(mostLikes, 'likes');
    // return _.maxBy(Object.keys(likesCount).map((key) => ({ author: key, likes: likesCount[key] })), 'likes');
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}