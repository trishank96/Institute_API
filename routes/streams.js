const express = require('express')
const router = express.Router()
const Joi = require('joi')

const Streams = [
    {id: 1, name: 'Electrical', seats: 100},
    {id:2, name:'Mechanical', seats: 80},
    {id:3, name:'Electronics', seats: 100},
    {id:4, name:'I.T.', seats: 120},
    {id:5, name:'Computer Science', seats: 120}
   ]

router.get('/', (req, res) => {
res.send(Streams)
})

router.get('/:id', (req, res) => {
const stream = Streams.find(S => S.id === parseInt(req.params.id))
if(!stream) return res.status(404).send(`Stream not found with id:${req.params.id}`)

res.send(stream)
})

router.post('/', (req, res) => {
const { error } = userValidation(req.body)
if(error) return res.status(400).send(error.details[0].message)

const stream={
   id: Streams.length+1,
   name: req.body.name,
   seats: req.body.seats    
   }
Streams.push(stream)
res.send(stream)
})

router.put('/:id', (req, res) => {
const stream = Streams.find(S => S.id === parseInt(req.params.id))
if(!stream) return res.status(404).send(`Stream not found with id:${req.params.id}`)

const { error } = userValidation(req.body)
if(error) return res.status(400).send(error.details[0].message)

stream.name = req.body.name
stream.seats = req.body.seats

res.send(stream)

})

router.delete('/:id', (req, res) => {
const stream = Streams.find(S => S.id === parseInt(req.params.id))
if(!stream) return res.status(404).send(`Stream not found with id:${req.params.id}`)

let index = Streams.indexOf(stream)
Streams.splice(index, 1)

res.send(stream)
})

function userValidation(stream){
const schema = {
name: Joi.string().min(3).required(),
seats: Joi.required()
}

return Joi.validate(stream, schema)
}


module.exports = router