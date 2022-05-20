const axios = require("axios");

async function get(cityName) {
    const baseUrl = 'https://api.teleport.org/api/urban_areas/';
    
    return axios.get(baseUrl)
        .then((response) => {
            const list = response.data._links["ua:item"];

            const result = list.filter((city) => city.name.toLowerCase() === cityName.toLowerCase());

            return axios.get(result[0].href).then((response) => {
                const img = response.data._links["ua:images"].href;
                return axios.get(img).then((response) => {
                    //console.log(response.data.photos[0].image.web);
                    return  response.data.photos[0].image.web;               
                });
            });
        });   
}

module.exports = { get: get };