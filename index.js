const express = require('express')
const port = 3000
const db = require('./queries')

const app = express()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// const bodyParser = require('body-parser')
// app.use(body.json());
// app.use(express.urlencoded({
//   extended: true
// }));


app.get('/', (request, response) => {
  response.json({info: 'Node.js, Express, and Postgress API'})
})

app.get('/users', db.getUsers)

app.get('/users/:id', db.getUserById)

app.post('/users', db.createUser)

app.put('/users/:id', db.updateUser)

app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

