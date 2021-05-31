const { static } = require('express')           //  use static module/library of the express 
const express = require('express')              // import express
const getTasks = require('./services/notion')   //  import file
const PORT = process.env.PORT || 3000           //  set app port

const app = express()                           //express init

app.use(express.static('public'))               // use publc folder in app

//  fetch tasks and send in responce
app.get('/tasks', async (req, res) => {
    const Tasks = await getTasks()
    res.json(Tasks)
})

app.listen(PORT, (error) => console.error(error))
