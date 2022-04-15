const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors');
const Path = require('path')  

connectToMongo();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/uploads/:id', async (req, res) => {

const path = Path.join(__dirname, req.params.id);

  try {
    await Fs.access(path)
    res.status(500).send("Found");
  } catch {
    res.sendFile(__dirname + '/uploads/imgNotFound.jpg');
  }

})

app.get('/uploads//:id', async (req, res) => {

  const path = Path.join(__dirname, req.params.id);
  
    try {
      await Fs.access(path)
      res.status(500).send("Found");
    } catch {
      res.sendFile(__dirname + '/uploads/imgNotFound.jpg');
    }
  
  })


app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/blogs', require('./routes/blogs'));


app.listen(port, () => {
  console.log(`noteYard app listening at http://localhost:${port}`)
})