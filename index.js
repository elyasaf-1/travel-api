const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {getData} = require ("./scraper");
const City = require("./models/city");

const app = express();
app.use(cors());

const port = 5000;

mongoose.connect('mongodb://localhost:27017/kipa');

const city = {
    name: 'וינה',
    restaurants: [{
        name: 'אלף אלף',
        type: 'בשרי',
        adress: 'Seitenstettengasse 2, 1010 Wien, Austria'
    }],
    general: []
}

app.get('/',function(req,res) {
    res.json({user:'elyasaf'});
});

app.get('/city',function(req,res) {
    const cityName = req.query.name;

    getData(cityName).then((city) => {
        res.json(city);
    });
    // City.getCity(cityName).then((city) => {
    //     res.json(city);
    // });
});

app.listen(port,()=>{
    console.log('now listening on port', port);
});

