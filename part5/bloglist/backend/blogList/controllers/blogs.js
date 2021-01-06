const blogsRouter = require('express').Router();
const Blog = require('./../models/blogs');
const User = require('./../models/users');
const config = require('./../utils/config')
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user');
    response.json(blogs);
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const findBlog = await Blog.findById(request.params.id).populate('user');
    if (!!findBlog && findBlog.user && findBlog.user._id) {
        if (findBlog.user._id == decodedToken.id) {
            Blog.findByIdAndRemove(request.params.id, (err, result) => {
                if (err) {
                    response.status(500).json({ error: 'Delete failed!' });
                } else {
                    response.status(200).json({ message: 'Blog deleted!' });
                }
            });
        } else {
            console.log('findBlog.user._id', typeof findBlog.user._id, 'decodedToken.id', typeof decodedToken.id);
            response.status(403).json({ error: 'You shall not pass!' });
        }
    } else {
        response.status(404).json({ error: 'Blog doesn\'t exist!' });
    }
})

blogsRouter.put('/:id', (request, response) => {
    const { author, title, url, likes } = request.body;
    Blog.findByIdAndUpdate(request.params.id, { author, title, url, likes }, (err, docs) => {
        if (err) {
            response.status(500).json({ error: 'Update failed!' });
        } else {
            response.status(200).json({ error: 'Blog successfully!' });
        }
    });
})

blogsRouter.post('/', async (request, response) => {
    const { title, url, userId, likes } = request.body;
    if (!title && !url) {
        response.status(400).json({ error: 'title & url are missing' });
    } else {
        const decodedToken = jwt.verify(request.token, config.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id);

        const blog = new Blog({
            title,
            url,
            user: user._id,
            likes
        })
        blog
            .save()
            .then(async result => {
                user.blogs = user.blogs.concat(result._id)
                await user.save();
                response.status(201).json(result)
            })
    }
})

module.exports = blogsRouter;