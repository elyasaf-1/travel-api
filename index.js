const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = 3000;

app.get('/',function(req,res) {
    res.json({user:'elyasaf'});
});

app.listen(port,()=>{
    console.log('now listening on port', port);
});

