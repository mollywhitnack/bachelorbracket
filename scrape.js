var cheerio = require('cheerio');
var request = require('request');

//exports.getContestants = () =>{
    console.log()

    //return new Promise((resolve, reject) => {

    let url = 'http://abc.go.com/shows/the-bachelorette/cast';
    let jojo = 'http://cdn1.edgedatg.com/aws/abc/TheBachelorette/person/person-person_5fb3626e-febf-4d42-8eda-2d22ab4a72dd_943x943_source-330x330-Q90_1461705442423.jpg'
    let cast = [];

    request(url, (err,response,body) => {
      if (err || !body) return err;

      let $ = cheerio.load(body);
      let contestants = [];
      let roses = $('.m-submenu-show-branding')
      let searchResult = $(`<img class=" m-slideshow-background fluid-img lazyloaded" alt>`);
      let container  = $(`ul.tiles`)
      let all = container.find('.background-link');
      //console.log('test', all[0].attribs['data-tealium-tracking'].split(';')[5]);
      for(let i=0; i< all.length; i++){
        let info = all[i].attribs['data-tealium-tracking'].split(';');

        let contestant = {
          name: info[3],
          img: info[5]
        }

        contestants.push(contestant)

      }
      console.log('contestants:', contestants)
      console.log('\nroses:', roses[0].attribs.style);
      return contestants
    });
  //}


