import express from 'express'
import main from '../templates/template'
import get from './http.service'
import transform from './transform.service'

const app = express()

app.use('/static', express.static('dist/client/js'))
app.use('/static', express.static('dist/client/css'))

app.get('/', (req, res) => {
        res.send(main)
})

app.get('/list', (req, res) => {
        get('list')
                .then(res => res.data)
                .then(res.json.bind(res))
                .catch(err => res.status(500).send("Something went wrong"))
})

app.get('/:type', (req, res) => {
        var scid = req.query.scid
        if (typeof scid === 'undefined') {
                return res.status(400).send("Missing scid")
        }

        var transformFunc = transform[req.params.type]
        if (typeof transformFunc === 'undefined') {
                return res.status(400).send("Unsupported type")
        }


        get(req.params.type, {
                scid: scid
        })
        .then(transformFunc)
        .then(res.json.bind(res))
        .catch(err => {
                console.log(err)
               return res.status(500).send("Something went wrong")
        })
})


app.listen(3000, function() {
        console.log('Listening')
})
