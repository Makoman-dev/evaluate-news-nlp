var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');
const { url } = require('inspector');
const { log } = require('console');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname);

// Variables for url and api key
const key = api = {
    application_key: process.env.API_KEY
 };



app.get('/', function (req, res) {
    res.sendFile('dist/index.html')})


// POST Route
app.post('/test', (req, res) => {
    const article = res.body.url;
    const formdata = new FormData();
    formdata.append("key", key);
    formdata.append("txt", article);
    formdata.append("lang", "en");
      
      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      
      const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(req => ({
          status: req.status, 
          body: req.json()
        }))
        .then(({ status, body }) => console.log(status, body))
        .catch(error => console.log('error', error));
        console.log(response);
        res.send(response);
  });

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


