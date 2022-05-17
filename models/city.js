const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
    name: String,
    type: String,
    adress: String
});

const citySchema = mongoose.Schema({
    name: String,
    img: String,
    restaurants: [placeSchema],
    general: [placeSchema]
});

const City = mongoose.model('City', citySchema);

module.exports = {
    insert: function (city) {
        const cityDoc = new City(city);
        cityDoc.save();
    },

    getCity: function (cityName) {
        return City.findOne({ name: cityName });
    }
};

