const mongoose = require('mongoose')
const config = require('./../utils/config')
const mongoUrl = config.MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})


module.exports = mongoose.model('Blog', blogSchema)