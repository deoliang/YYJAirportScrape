const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const url = 'http://www.victoriaairport.com/departures';
const YYJDestinations = {
    "Cities": []
}
const uniqueSet = new Set();
rp(url)
  .then(function(html){
    $('.city',html).each(function(i, elem) {
       if(uniqueSet.has($(this).text()))return true;
        uniqueSet.add($(this).text())
    });
    YYJDestinations.Cities = [...uniqueSet].sort()
    fs.writeFile('YYJDestinations.json', JSON.stringify(YYJDestinations), function(err){
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
  })
  .catch(function(err){
    console.log(err);
  });
