const express = require('express');
const path = require('path');
const noteText = require('./db/db.json');
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
    res.json(noteText)
  });

  app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const newNote = {
      noteTitle: req.body.title,
      noteBody: req.body.body
    }
    console.log(newNote)
    noteText.push(newNote)
    console.log(noteText)
    fs.writeFile(noteText, JSON.stringify(noteText), (err) =>{
          if (err) {
              return console.log(err)
          }; 
          res.json(noteText)
      })
  })
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './index.html'));
      });


app.listen(PORT, () => {console.log(`App listening on http://localhost:${PORT}`)})