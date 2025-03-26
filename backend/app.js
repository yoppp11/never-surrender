require('dotenv').config()

const express = require('express')
const cors = require('cors')
 
const app = express()
const port = 3000


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/', require('./routers/index'))


app.listen(port, ()=> {
    console.log(`lari bg ada meteor ${port}`);
})