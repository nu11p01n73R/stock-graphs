import express from 'express'
import sayHello from './app'

const app = express()
app.get('/', function(req, res) {
        res.send(sayHello("world!!"))
});


app.listen(3000, function() {
        console.log('Listening')
})
