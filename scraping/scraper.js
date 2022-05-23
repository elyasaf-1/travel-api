const { translate } = require("../helper");
const restaurant1 = require("./restaurants/restaurant1");
const restaurant2 = require("./restaurants/restaurant2");

const general1 = require("./general/general1");
const general2 = require("./general/general2");
const image = require("./image/image")

const MAXLENGTH = 7;

async function get(cityName) {
    const engName = await translate(cityName);

    const promises = [getRestaurants(engName, cityName), getGeneral(engName, cityName), image.get(engName)];

    return Promise.all(promises).then(([rests, general, img]) => {
        return {name: cityName, img: img, restaurants: rests, general: general};
    });
}

function same(rest1, rest2) {
    let adress1 = rest1.adress.toLowerCase();
    let adress2 = rest2.adress.toLowerCase();

    if (adress2.length > adress1.length) {
        const temp = adress1;
        adress1 = adress2;
        adress2 = temp;
    }

    let words = adress2.replace(/[-_]/g, ' ').replace(/[,\.]/g, '').split(' ');

    const counter = words.length;

    words = words.filter((word) => {
        return !adress1.includes(word);
    });

    if (counter - words.length > 3) {
        return true;
    }

    return false;
}

function merge(rest1, rest2) {
    rest2 = rest2.slice(0, MAXLENGTH - rest1.length);
    rest2 = rest2.filter((rest) => {
        for (const r of rest1) {
            if (same(r, rest)) {
                return false;
            }
        }
        return true;
    });

    const merged = [...rest1, ...rest2];

    return merged;
}

function margeAll(arrOfData) {
    let merged = [];

    for (let i = 0; i < arrOfData.length && merged.length < MAXLENGTH; i++) {
       merged =  merge(merged, arrOfData[i]);
    }

    return merged;
}

function getRestaurants(cityName, hebrewName) {
    return Promise.all([restaurant1.get(cityName), restaurant2.get(hebrewName)]).then((arrOfRests) => {

        return margeAll(arrOfRests);
    });
}

function getGeneral(cityName, hebrewName) {
    return Promise.all([general1.get(cityName), general2.get(hebrewName)]).then((arrOfGeneral) => {

        return margeAll(arrOfGeneral);
    });
}

module.exports.getData = get;