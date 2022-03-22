const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const axios = require("axios");
const cheerio = require("cheerio");
async function get () {

    console.log('start to scrape');
    const search = 'Melbourne';
    const selector = '#post-22386 > div > div.col-lg-9.col-md-9.col-mod-single.col-mod-main > div > div.col-lg-10.col-md-10.col-sm-10 > div > figure.wp-block-table > table > tbody'
    axios.get('https://yeahthatskosher.com/2020/04/master-list-kosher-restaurants-services-currently-open-takeout-delivery/')
    .then(({data}) => {
        const reg = '^<td>([a-zA-Z]+)'+search+'</td>*';
        const re = new RegExp(reg, 'g');
        let results = [];
        const $=cheerio.load(data);
        const a = $(selector).html();
        // a.forEach((b) => {
        //     b = b.html();
        //     console.log(b);
        // })
        console.log(a);

         
        // if (a.includes(search)) {
        //    console.log(reg.exec(a)[1]);
        // }

    }).catch((err) => {
        console.log(err);
    });
    // const config = {
    //     baseSiteUrl: 'https://yeahthatskosher.com/2020/04/master-list-kosher-restaurants-services-currently-open-takeout-delivery/',
    //     startUrl: 'https://yeahthatskosher.com/2020/04/master-list-kosher-restaurants-services-currently-open-takeout-delivery/',
    //     concurrency: 10,//Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
    //     maxRetries: 3,//The scraper will try to repeat a failed request few times(excluding 404). Default is 5.        
    // }
    
    
    // const scraper = new Scraper(config);//Create a new Scraper instance, and pass config to it.
    
    // const root = new Root();//The root object fetches the startUrl, and starts the process.  
    
    // //Any valid cheerio selector can be passed. For further reference: https://cheerio.js.org/
    // // const category = new OpenLinks('.category',{name:'category'});//Opens each category page.
    
    // // const article = new OpenLinks('article a', {name:'article' });//Opens each article page.
    
    // // const image = new DownloadContent('img', { name: 'image' });//Downloads images.
    
    // // const title = new CollectContent('h1', { name: 'title' });//"Collects" the text from each H1 element.
    
    // // const story = new CollectContent('section.content', { name: 'story' });//"Collects" the the article body.
    
    // const strong = new CollectContent('strong', { name: 'strong' });
    
    // // root.addOperation(category);//Then we create a scraping "tree":
    // //   category.addOperation(article);
    // //    article.addOperation(image);
    // //    article.addOperation(title);
    // //    article.addOperation(story);
    
    // root.addOperation(strong);
    
    // await scraper.scrape(root);
    
    // //const articles = article.getData()//Will return an array of all article objects(from all categories), each
    // //containing its "children"(titles,stories and the downloaded image urls) 
    
    // //If you just want to get the stories, do the same with the "story" variable:
    // const strongs = strong.getData();
    // console.log('strongs', strongs);
}

module.exports.getData = get;