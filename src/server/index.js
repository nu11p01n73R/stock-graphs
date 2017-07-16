import express from 'express'
import main from '../templates/template'
import get from './http.service'
import pe_ratio from './transform.service'

const app = express()

app.use('/static', express.static('dist/client'))

app.get('/', (req, res) => {
        res.send(main)
})

app.get('/:type', (req, res) => {
        var scid = req.query.scid
        if (typeof scid === 'undefined') {
                res.status(400).send("Missing scid")
        }

        get(req.params.type, {
                scid: scid
        })
        .then(pe_ratio)
        .then(res.json.bind(res))
        .catch(err => {
               res.status(500).send("Something went wrong")
        })
})

app.listen(3000, function() {
        console.log('Listening')
})
