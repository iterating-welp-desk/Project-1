const path = require('path');
const fetch = require('node-fetch');

const searchController = {};

searchController.home = (req, res) => {
  console.log('searchController.home');
  //res.sendFile( path.join(__dirname , '../static/search.html') );
};

searchController.searchBar = (req, res) => {
  console.log('searchController.searchBar');
  res.sendFile(path.join(__dirname, '../static/searchBar.html'));
};

searchController.results = (req, res) => {
  console.log('searchController.results');
  let query = req.body.searchBar;
  //console.log("query:",query);
  fetch(`http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=216072&t.k=gnFZ3pppFCq&action=employers&q=${query}&userip=67.245.145.191&useragent=Mozilla`).then(response => response.json()).then(data => res.send( data )).catch(err => console.log(err));
  //res.send( req.body );
  //res.sendFile( path.join(__dirname , '../static/results.html') );
};


// searchController.addItem = (req, res)=>{
//     res.sendFile('../static/additem.html');
// }
// searchController.login = (req, res)=>{
//     res.sendFile('../static/login.html');
// }

module.exports = searchController;
