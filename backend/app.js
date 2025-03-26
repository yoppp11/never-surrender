if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/', require('./routers/index'))


module.exports = {
    app
}