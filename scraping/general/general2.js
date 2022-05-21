const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { fixCities } = require('../../helper');

function get(cityName) {
    cityName = fixCities(cityName);
    const baseUrl = 'https://www.xplorer.co.il/tools/chabad';
    
    return axios.get(baseUrl)
        .then(({data}) => {
            const dom = new JSDOM(data);
            const grids = dom.window.document.getElementsByClassName("chabad_list_grid");
            const promises = [];
            
            for (let i = 0; i < grids.length; i++) {
                const rows = grids[i].querySelectorAll("tr");

                for (let j = 1; j < rows.length; j++) {
                    if (rows[j].children[1].textContent.trim() === cityName.trim()) {
                    const adress = rows[j].children[5].children[0].href.substring(27).replace(/%20/g, ' ').replace(/%../g, '').trim();
                    const name = rows[j].children[0].textContent.trim();
                    const place = {name: name, type: 'בית חב"ד', adress: adress};

                    promises.push(place)
                    }
                }
            }
            
            return Promise.all(promises);
        });   
}

module.exports = { get: get };