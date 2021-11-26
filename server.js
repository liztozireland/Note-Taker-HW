const express = require('express');
const path = require('path');
const dBase = require('./db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

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
    res.json(dBase)
  });

  app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const noteWrite = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4()
    }
    console.log(noteWrite)
    dBase.push(noteWrite)
    console.log(dBase)
    fs.writeFile('./db/db.json', JSON.stringify(dBase), (err) =>{
          if (err) {
              return console.log(err)
          }; 
          res.json(dBase)
      })
  })
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './index.html'));
      });


app.listen(PORT, () => {console.log(`App listening on http://localhost:${PORT}`)})