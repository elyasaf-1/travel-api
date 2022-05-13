const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { getData } = require ("./scraping/scraper");
const City = require("./models/city");
const Blog = require("./models/blog");
const { fixName } = require("./translate");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 5000;

mongoose.connect('mongodb://localhost:27017/kipa');

const city = {
    name: 'וינה',
    img: "",
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

app.get('/city', async function(req,res) {
    const cityName = await fixName(req.query.name);

    City.getCity(cityName).then((city) => {
        if (city) {
            res.json(city);
        } else {
            getData(cityName).then((city) => {
                City.insert(city);
                res.json(city);
            }).catch((err) => console.log('err', err));
        }
    }).catch((err) => console.log('err', err));
});

app.get('/blog',function(req,res) {
    const cityName = req.query.name;

    Blog.getBlogs(cityName).then((blogs) => {
        res.json(blogs);
    }).catch((err) => console.log('err', err));
});

app.post('/blog',function(req,res) {
    const cityNmae = req.body.city;
    const description = req.body.content;

    Blog.insert({city: cityNmae, description: description})
        .then(() => {
            res.sendStatus(200);
        })
});

app.listen(port,()=>{
    console.log('now listening on port', port);
});


