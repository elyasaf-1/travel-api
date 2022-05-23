const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { getData } = require ("./scraping/scraper");
const City = require("./models/city");
const Blog = require("./models/blog");
const { fixName, isNotCity } = require("./helper");

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
    const name = req.query.name;

    if (await isNotCity(name)) {
        res.json({name: name, img: '', restaurants: [], general: []});
        return;
    }

    const cityName = await fixName(name);

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

app.get('/blog', async function(req,res) {
    const cityName = await fixName(req.query.name);

    Blog.getBlogs(cityName).then((blogs) => {
        res.json(blogs);
    }).catch((err) => {
        console.log('err', err);
        res.json([]);
    });
});

app.post('/blog', async function(req, res) {
    const cityName = await fixName(req.body.city);
    const description = req.body.content;

    if (await isNotCity(cityName)) {
        res.sendStatus(200);
        return;
    }

    Blog.insert({city: cityName, description: description})
        .then(() => {
            res.sendStatus(200);
        })
});

app.listen(port,()=>{
    console.log('now listening on port', port);
});


