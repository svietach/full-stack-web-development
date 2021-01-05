const blogsRouter = require('express').Router();
const Blog = require('./../models/blogs');

blogsRouter.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
    const findBlog = await Blog.findById(request.params.id);
    if (!!findBlog) {
        Blog.findByIdAndRemove(request.params.id, (err, result) => {
            if (err) {
                response.status(500).json({ error: 'Delete failed!' });
            } else {
                response.status(200).json({ message: 'Blog deleted!' });
            }
        });
    } else {
        response.status(404).json({ error: 'Blog doesn\'t exist!' });;
    }
})

blogsRouter.put('/api/blogs/:id', (request, response) => {
    const { author, title, url, likes } = request.body;
    Blog.findByIdAndUpdate(request.params.id, { author, title, url, likes }, (err, docs) => {
        if (err) {
            response.status(500).json({ error: 'Update failed!' });
        } else {
            response.status(200).json({ error: 'Blog successfully!' });
        }
    });
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