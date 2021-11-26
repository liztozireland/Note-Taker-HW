const express = require('express');

const app = express();
const PORT = 8081;

app.get('/', (req,res) =>{
    res.send('Hello World')
})



app.listen(PORT, () => {console.log(`App listening on http://localhost:${PORT}`)})