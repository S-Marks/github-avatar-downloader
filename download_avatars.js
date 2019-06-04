var request = require('request');
var fs = require('fs')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    let contributorObj = JSON.parse(res.body);
    cb(err, contributorObj);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach((item) => {
    // console.log(item.avatar_url);
    var filePath = "./pictures/" + item.login + ".jpg"
    downloadImageByURL(item.avatar_url, filePath)
  })
});

function downloadImageByURL(url, filePath) {

  request.get(url)               // Note 1
         .on('error', function (err) {                                   // Note 2
           throw err;
         })
         .on('response', function (response) {                           // Note 3
           console.log(response.statusMessage, response.headers['content-type']);
         })
         .pipe(fs.createWriteStream(filePath));
};

console.log('Welcome to the GitHub Avatar Downloader!');
