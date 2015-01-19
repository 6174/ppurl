/**
 * 下载worker
 */
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');
var urlencode = require('urlencode');

module.exports = function(data, callback) {
	var page = data.index;
	var url = data.url;
	console.log('start download: ' + url);
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			// console.log(body);
			var $doc = cheerio.load(body);
			var $links = $doc('a');
			$links = $links.filter(function(index, link) {
				return link.attribs.href.indexOf('ed2k') >= 0;
			});
			var data = '## 皮皮书屋电驴下载资源 \n\n';
			$links.map(function(index, link) {
				var href = link.attribs.href;
				var splits = href.split('|');
				data += '[' + urlencode.decode(splits[2]) + '](' + href + ')\n\n';
				return link.attribs.href;
			});
			var file = './data/' + page + '.md';
			fs.outputFile(file, data, function(err) {
				if (err) {
					console.log('save error', err);
				}
			});
			// console.log(data);
			callback(null, 'ok');
		}
	});
}