const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const {get} = require('http');

const app = express();
const PORT = 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
  })
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'))
  })
  app.get('/api/notes', (req, res) => {
    res.json(db)
  });



app.listen(PORT, () => {console.log(`App listening on http://localhost:${PORT}`)})