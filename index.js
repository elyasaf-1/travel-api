const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');

const app = express();
app.use(cors());

const port = 5000;
s
mongoose.connect('mongodb://localhost:27017/kipa')

app.get('/',function(req,res) {
    res.json({user:'elyasaf'});
});

app.listen(port,()=>{
    console.log('now listening on port', port);
});

