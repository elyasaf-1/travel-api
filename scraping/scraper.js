const { translate } = require("./../translate");
const restaurant1 = require("./restaurants/restaurant1");
const general1 = require("./general/general1");
const MAXLENGTH = 7;

async function get(cityName) {
    const engName = await translate(cityName);

    const promises = [getRestaurants(engName), getGeneral(engName)];

    return Promise.all(promises).then(([rests, general]) => {
        return {name: cityName, restaurants: rests, general: general};
    });
}

function merge(rest1, rest2) {
    const merged = [...rest1, ...rest2].slice(0, MAXLENGTH);

    return merged;
}

function margeAll(arrOfData) {
    let merged = [];

    for (let i = 0; i < arrOfData.length && merged.length < MAXLENGTH; i++) {
       merged =  merge(merged, arrOfData[i]);
    }

    return merged;
}

function getRestaurants(cityName) {
    return Promise.all([restaurant1.get(cityName)]).then((arrOfRests) => {

        return margeAll(arrOfRests);
    });
}

function getGeneral(cityName) {
    return Promise.all([general1.get(cityName)]).then((arrOfGeneral) => {

        return margeAll(arrOfGeneral);
    });
}

module.exports.getData = get;