const express = require('express')
const app = express()
const streams = require('./routes/streams')
const config = require('config')
const debug = require('debug')('app: TMV')
const morgan = require('morgan')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/streams', streams)


debug(`Application name: ${config.get('name')}`)
debug(`Mail server: ${config.get('mail.host')}`)

if(app.get('env')==='development'){
    app.use(morgan('short'))
    
}



const port = process.env.port || 3300
app.listen(port, () => {console.log(`Listening on port ${port}`)})