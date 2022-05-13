const translate = require("translate");

async function translateCityName(hebrewName) {
    translate.engine = "google"; // Or "yandex", "libre", "deepl"
    translate.key = process.env.GOOGLE_KEY;

    const cityName = await translate(hebrewName , {from: "he", to: "en"});

    return cityName;
}
async function fixName(hebrewName) {
    translate.engine = "google"; // Or "yandex", "libre", "deepl"
    translate.key = process.env.GOOGLE_KEY;

    const cityName = await translate(hebrewName , {from: "he", to: "en"});
    const fixedName = await translate(cityName , {from: "en", to: "he"});

    return fixedName;
}



module.exports = {
    translate: translateCityName,
    fixName: fixName
};