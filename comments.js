//create a web server
//create a route for POST /comments
//create a route for GET /comments
//create a route for GET /comments/:id
//create a route for PUT /comments/:id
//create a route for DELETE /comments/:id

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let comments = [
    {id: 1, author: 'John', body: 'Hello, world!'},
    {id: 2, author: 'Jane', body: 'Hi, planet!'},
    {id: 3, author: 'John', body: 'What a wonderful day!'}
];

app.post('/comments', (req, res) => {
    const newComment = req.body;
    if (!newComment.author || !newComment.body) {
        return res.status(400).json({msg: 'author and body are required'});
    }
    comments.push(newComment);
    res.json(newComment);
});

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.get('/comments/:id', (req, res) => {
    const id = Number(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (!comment) {
        return res.status(404).json({msg: 'Comment not found'});
    }
    res.json(comment);
});

app.put('/comments/:id', (req, res) => {
    const id = Number(req.params.id);
    const update = req.body;
    const comment = comments.find(comment => comment.id === id);
    if (!comment) {
        return res.status(404).json({msg: 'Comment not found'});
    }
    comment.author = update.author;
    comment.body = update.body;
    res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) {
        return res.status(404).json({msg: 'Comment not found'});
    }
    comments.splice(index, 1);
    res.json({msg: 'Comment deleted'});
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

