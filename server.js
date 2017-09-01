const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html')
})
var db

MongoClient.connect('mongodb://dungna:dungna2401@ds115124.mlab.com:15124/star-war-d', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log(database)
  })
})
app.post('/quotes', (req, res) => {
	console.log(db)
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/quotes', (req, res) => {
	 db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.set('view engine', 'ejs')