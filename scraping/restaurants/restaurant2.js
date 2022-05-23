const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function get(cityName) {
    const baseUrl = 'https://www.hul-kasher.co.il/%D7%9E%D7%A1%D7%A2%D7%93%D7%95%D7%AA-%D7%9B%D7%A9%D7%A8%D7%95%D7%AA/';

    return axios.get(baseUrl)
        .then(({data}) => {
      
            const dom = new JSDOM(data);
            const container = dom.window.document.getElementsByClassName("elementor-text-editor");

            let rests = [];

            let found = false;
            let finish = false;
            for (let i = 2; i< container.length - 2 && !found; i++) {
                for (let j = 0; j < container[i].children.length && !finish; j++) {
                    const p = container[i].children[j];
                    
                    if (found) {
                        if (p.children.length === 1 ) {
                            console.log(p.children[0].tagName);
                        }
                        if (p.children.length === 1 && p.children[0].tagName ===  'STRONG') {
                            finish = true;
                        }
                        if (p.children.length === 1 && p.children[0].tagName ===  'A') {
                            
                            const name = p.children[0].textContent;
                            const adress = container[i].children[++j].textContent.slice(7);
                            if (adress.length > 10) {
                                rests.push({name: name, type: 'מסעדה', adress: adress});
                            }  
                        }

                    }
                    if (p.children.length !== 0 && p.children[0].textContent ===  cityName +':') {
                        found = true;
                    }
                }
            }
            return Promise.resolve(rests);
        }).catch((err) => {
            console.log(err);
            return [];
        });  
}

module.exports = { get: get };