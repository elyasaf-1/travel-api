const translate = require("translate");
const axios = require("axios");

translate.engine = "google"; // Or "yandex", "libre", "deepl"
translate.key = process.env.GOOGLE_KEY;

async function translateCityName(hebrewName) {
    const cityName = await translate(hebrewName , {from: "he", to: "en"});

    return cityName;
}

async function fixName(hebrewName) {
    const cityName = await translate(hebrewName , {from: "he", to: "en"});
    const fixedName = await translate(cityName , {from: "en", to: "he"});

    return fixedName;
}

async function isNotCity(name) {
    const engName = await translate(name , {from: "he", to: "en"});
    const baseUrl = 'https://api.teleport.org/api/urban_areas/';
    
    return axios.get(baseUrl)
        .then((response) => {
            const list = response.data._links["ua:item"];

            const result = list.filter((city) => city.name.toLowerCase() === engName.toLowerCase());

            console.log('test', engName, result);

            if (result.length === 0) {
                return true;
            }
            return false;
        }).catch((err) => {
            console.log(err);
            return true;
        });
}

function fixCities(name) {
    if (name === 'ניו יורק') {
       return 'ניו יורק סיטי';
    }
    return name;
}



module.exports = {
    translate: translateCityName,
    fixName: fixName,
    isNotCity: isNotCity,
    fixCities: fixCities
};