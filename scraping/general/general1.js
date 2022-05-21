const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getGeneral(generalUrl) {
    return axios.get(generalUrl).then(({data}) => {
        const dom = new JSDOM(data);
        const name = dom.window.document.querySelector("h1").textContent.trim();

        const meta = dom.window.document.getElementsByClassName("property-meta");
        const type = meta[0].children[0].children[0].textContent.trim();

        const adress = dom.window.document.getElementsByClassName("property-address")[0].textContent.trim();

        return {name: name, type: type, adress: adress};
    });
}

async function get(cityName) {
    const baseUrl = 'https://kosher-traveling.co.il/food/';
    
    return axios.get(baseUrl + cityName)
        .then(({data}) => {
            const dom = new JSDOM(data);
            const container = dom.window.document.getElementsByClassName("property-loop-container")[1];

            const promises = [];
            for (let i = 0; i < container.children.length && i < 7; i++) {
                restUrl = container.children[i].children[0].href;
                promises.push(getGeneral(restUrl));
            }
            return Promise.all(promises);
        }).catch(() => []); 
}

module.exports = { get: get };