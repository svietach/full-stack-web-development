const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 3001;

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('build'))

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
    res.send(data);
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;
    let error;

    if (!name || !number) {
        error = 'The name or number is missing';
    } else {
        const findPerson = data.filter((person) => person.name === name);
        if (!!findPerson.length) {
            error = 'The name already exists in the phonebook';
        } else {
            data.push({
                name,
                number,
                id: Math.floor(Math.random() * 100),
            });
        }
    }

    if (error) {
        // res.sendStatus(422);
        res.send({ error });
    } else {
        res.sendStatus(201);
    }


})

app.get('/api/persons/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    const findPerson = data.filter((person) => person.id == req.params.id);
    console.log(findPerson);
    if (findPerson.length) {
        res.send(findPerson[0]);
    } else {
        res.sendStatus(404);
    }
})

app.delete('/api/persons/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    const findPerson = data.filter((person) => person.id == req.params.id);
    console.log(findPerson);
    if (findPerson.length) {
        data = data.filter((person) => person.id != req.params.id);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

app.get('/info', (req, res) => {
    res.send('Phonebook has info for ' + data.length + ' people <br /><br />' + new Date());
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}.`)
})