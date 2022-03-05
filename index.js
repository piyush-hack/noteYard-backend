const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors') 

connectToMongo();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Welcome')
})


app.use('/api/auth', require ('./routes/auth'));
app.use('/api/notes', require ('./routes/notes'));
app.use('/api/blogs', require ('./routes/blogs'));


app.listen(port, () => {
  console.log(`noteYard app listening at http://localhost:${port}`)
})