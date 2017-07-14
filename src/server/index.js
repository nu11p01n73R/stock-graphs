import express from 'express'
import main from '../templates/template'
import get_pe_ratio from './analyse'

const app = express()

app.use('/static', express.static('dist/client'))

app.get('/', (req, res) => {
        res.send(main)
})

app.get('/pe', (req, res) => {
        console.log("here")
        res.send(get_pe_ratio())
})


app.listen(3000, function() {
        console.log('Listening')
})
