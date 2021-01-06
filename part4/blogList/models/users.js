const mongoose = require('mongoose')
const config = require('./../utils/config')

const mongoUrl = config.MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // the passwordHash should not be revealed
        delete returnedObject.password
    }
})

module.exports = mongoose.model('User', userSchema)