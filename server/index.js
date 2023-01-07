const express = require('express')
const body_parser = require('body-parser')
const cors = require('cors')
const run = require('./config')
require('dotenv').config
const app = express()



var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json())

run

const port = process.env.PORT ? process.env.PORT : "3000";

// our routers here
//app.use(require('./routes/stats.routes'))


app.listen(port, () => console.log(`CS:GO app listening on port 
${port}!`))