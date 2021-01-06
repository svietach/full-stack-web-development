const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('./../models/users');
const config = require('./../utils/config');
const jwt = require('jsonwebtoken');

usersRouter.post('/', async (request, response) => {
    const { name, username, password } = request.body;
    if (!name || !username || !password) {
        response.status(400).json({ error: 'name or username or password is missing' });
    } else if (password.length < 3 || username.length < 3) {
        response.status(400).json({ error: 'Both username and password must be at least 3 characters long' });
    } else {
        const saltRounds = 10;
        const user = new Users({
            name,
            username,
            password: await bcrypt.hash(password, saltRounds)
        });

        user
            .save()
            .then(result => {
                response.status(201).json(result);
            })
    }
});

usersRouter.get('/', async (request, response) => {
    const users = await Users
        .find({})
        .populate('blogs');

    response.json(users);
});

usersRouter.post('/login', async (request, response) => {
    const body = request.body;

    const user = await Users.findOne({ username: body.username });
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.password);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, config.SECRET);

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
});
module.exports = usersRouter;