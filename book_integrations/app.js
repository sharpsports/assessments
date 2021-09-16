const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var jsonParser = bodyParser.json();

//Mock bet data reciever
app.post("/betSlips", jsonParser,(req, res) => {
    console.log(`Number of bets: ${req.body.length}`)
    res.status(200).end()
})

app.listen(3002, function () {
    console.log('Listening for bet data')
})