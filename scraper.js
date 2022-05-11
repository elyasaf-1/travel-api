const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const translate = require("translate");

async function translateCityName(hebrewName) {
    translate.engine = "google"; // Or "yandex", "libre", "deepl"
    translate.key = process.env.GOOGLE_KEY;

    const cityName = await translate(hebrewName , {from: "he", to: "en"});
    console.log(cityName);
    return cityName;
}

function getRestaurant(RestaurantUrl) {
    return axios.get(RestaurantUrl).then(({data}) => {
        const dom = new JSDOM(data);
        const name = dom.window.document.querySelector("h1").textContent.trim();

        const meta = dom.window.document.getElementsByClassName("property-meta");
        const type = meta[0].children[0].children[0].textContent.trim();

        const adress = dom.window.document.getElementsByClassName("property-address")[0].textContent.trim();

        return {name: name, type: type, adress: adress};
    });
}

function get(cityName) {
    const engName = translate(cityName);

    const baseUrl = 'https://kosher-traveling.co.il/food/';

    console.log('start to scrape');
    return axios.get(baseUrl + engName)
        .then(({data}) => {
            const dom = new JSDOM(data);
            const container = dom.window.document.getElementsByClassName("property-loop-container")[0];

            console.log(container.children.length);

            const promises = [];
            for (let i = 0; i < container.children.length - 1; i++) {
                restUrl = container.children[i].children[0].href;
                promises.push(getRestaurant(restUrl));
            }
            return Promise.all(promises).then((rests) => {
                return ({name: cityName, restaurants: rests, general: []});
            });
        });   
}

module.exports.getData = get;