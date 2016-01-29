var request = require("request");
var async = require("async");
var xmlreader = require('xmlreader');
var url = require("url");
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");

module.exports = function(u, callback) {
  var download = (callback) => {
    request.get(u, (err, resource, body) => {
      if (err) return callback(err);
      return callback(null, body);
    });
  };

  var read = (data, callback) => {
    xmlreader.read(data, callback);
  };

  var parse = (data, callback) => {
    data.rss.channel.item.each((index) => {
      var item = data.rss.channel.item.at(index);

      var u = url.parse(item.guid.text());
      var p = './download/' + item["itunes:subtitle"].text() + " - " + item.title.text() + ".mp3";

      var createDirectory = (callback) => {
        mkdirp(path.dirname(p), callback());
      };

      var downloadMp3 = (callback) => {
        request.get(item.guid.text())
          .on('error', function(err) {
            console.log(err);
          }).pipe(fs.createWriteStream(p))
          .on("end", callback);
      };

      async.waterfall([createDirectory, downloadMp3], callback);
    });

    return callback();
  };

  async.waterfall([download, read, parse], callback);
};
