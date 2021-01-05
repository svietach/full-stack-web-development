const blogsRouter = require('express').Router();
const Blog = require('./../models/blogs');

blogsRouter.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/api/blogs', (request, response) => {
    const { title, url } = request.body;
    if (!title && !url) {
        response.status(400).json({ error: 'title & url are missing' });
    } else {
        const blog = new Blog(request.body)

        blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
    }
})

module.exports = blogsRouter;