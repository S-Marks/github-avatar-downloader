var request = require('request');
var fs = require('fs')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  // var result = "";
  // cb(JSON.parse(result))
  };

  request(options, function(err, res, body) {
    let contributorObj = JSON.parse(res.body);
    cb(err, contributorObj);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  result.forEach((item) => {
    console.log(item.avatar_url);
  })
});

console.log('Welcome to the GitHub Avatar Downloader!');
