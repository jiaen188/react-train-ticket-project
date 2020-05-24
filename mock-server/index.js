const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.status(200)
  response.send('hello express')
  response.end()
})

app.get('/rest', (req, res) => {
  res.json({
    result: 1,
    msg: 'hello express'
  })
})

app.listen(5000)