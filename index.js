var async = require("async");

var downloader = require("./downloader");

var urls = ["http://radiofrance-podcast.net/podcast09/rss_12265.xml"
  , "http://radiofrance-podcast.net/podcast09/rss_14231.xml"
  , "http://radiofrance-podcast.net/podcast09/rss_14232.xml"];

async.map(urls, downloader, (err, results) => {
  if (err) console.log("ERROR:", err);
  console.log(results);
});
