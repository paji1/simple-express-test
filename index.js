const express = require('express')
const app = express()
const bodyParser = require('body-parser');

var http = require('http');
var server = http.createServer(app);


app.use(bodyParser.json());

function logRequest(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(logRequest);



app.get('/api/info', (req, res) => {
	const serverInfo = {
		serverInfo: server,
		currentDate: new Date().toLocaleDateString(),
		currentTime: new Date().toLocaleTimeString()
	};
	res.json(serverInfo);
});

let todos = [];

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.post('/api/todos', (req, res) => {
    const todo = req.body;
    todo.id = todos.length 
    todos.push(todo);
    res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex] = req.body;
        res.json(todos[todoIndex]);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter(todo => todo.id !== id);
    res.sendStatus(204);
});



server.listen(3000,() => {
	console.log("server runining on",'\x1b[45mhttp://localhost:3000\x1b[0m')
})