const express = require('express')
const cors = require('cors')
require('express-async-errors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const BlogsRouter = require('./controllers/BlogsRouter.js')
const middleware = require('./utils/middleware')
const app = express()

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(BlogsRouter.apiRoot, BlogsRouter.router)
app.use(middleware.errorHandler)
const PORT = config.PORT || 3003

module.exports = app