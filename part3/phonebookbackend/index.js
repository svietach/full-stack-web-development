require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('build'));

let data = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
];

app.get('/api/persons', (req, res) => {
    Person.find({}).then((data) => res.send(data));
});

app.put('/api/persons/:id', (req, res) => {
    const { name, number } = req.body;
    Person.findByIdAndUpdate(req.params.id, { name, number }, (err, docs) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

app.post('/api/persons', async (req, res) => {
    const { name, number } = req.body;
    let error;

    if (!name || !number) {
        error = 'The name or number is missing';
    } else {
        const findPerson = await Person.find({ name });
        if (!!findPerson.length) {
            error = 'The name already exists in the phonebook';
        } else {
            const person = new Person({
                name,
                number,
                id: Math.floor(Math.random() * 100),
            });

            person.save().then(result => {
                res.sendStatus(201);
            })
        }
    }

    if (error) {
        // res.sendStatus(422);
        res.send({ error });
    }


})

app.get('/api/persons/:id', async (req, res) => {
    const findPerson = await Person.findById(req.params.id);
    if (!!findPerson) {
        res.send(findPerson);
    } else {
        res.sendStatus(404);
    }
})

app.delete('/api/persons/:id', async (req, res) => {
    console.log('req.params.id', req.params.id);

    const findPerson = await Person.findById(req.params.id);
    console.log(findPerson);
    if (!!findPerson) {
        Person.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(404);
    }
})

app.get('/info', (req, res) => {
    Person.find({}).then((data) => {
        res.send('Phonebook has info for ' + data.length + ' people <br /><br />' + new Date());
    });
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}.`)
})