import express from 'express'
import main from './templates/template'

const app = express()

app.use('/static', express.static('public'))

app.get('/', function(req, res) {
        res.send(main)
});


app.listen(3000, function() {
        console.log('Listening')
})
