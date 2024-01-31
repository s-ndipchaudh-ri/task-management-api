const express = require('express')
const app = express()

const task = require('./task')

const user = require('./user')


app.use('/task',task)
app.use('/user',user)

module.exports = app;