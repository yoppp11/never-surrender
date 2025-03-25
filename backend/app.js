require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000


app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', require('./routers/index'))


app.listen(port, ()=> {
    console.log(`lari bg ada meteor ${port}`);
})