import express from "express"
import csrf from 'csurf'
import cookiePareser from 'cookie-parser'
import bodyParser from 'body-parser'

import { Meme } from './meme'
import { getMeme, getTopPriced } from "./memeDB"
import { stringify } from "querystring"

const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })

let app = express()

app.set('view engine', 'pug')

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookiePareser())

app.get('/', function (req, res) {
    console.log('get /')
    getTopPriced(3).then((memeList) => {
        res.render('index', { memes: memeList, title: 'Meme market' })
    }).catch((reason) => {
        console.log(reason)
        res.render('error', { title: 'ERROR' })
    })
});

const port = 3000
app.listen(port, () => {
    console.log('App is listening on port ' + port)
})




app.get('/meme/:memeId', csrfProtection, (req, res) => {
    getMeme(parseInt(req.params.memeId))
        .then(([meme_res, history]) => {
            console.log(history)
            res.render('meme', { meme: meme_res, priceHistory: history })
        }).catch((reason) => {
            console.log('Error at get /meme/', req.params.memeId)
            console.log(reason)
            res.render('error', { message: "Couldn't get the meme" })
        })
})


app.post('/meme/:memeId', csrfProtection, function (req, res) {



    /*
    let promise = new Promise((resolve, reject) => {
        let meme = get_meme(parseInt(req.params.memeId))
        resolve()
    })

    promise.then((meme: Meme) => {
        
        let price = req.body.price;
        meme.change_price(price)
        res.render('meme', { meme: JSON.parse(meme.toString()), prices: [...meme.priceHistory].reverse() })
    })
*/
})