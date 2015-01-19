/**
 * 下载皮皮书屋电驴链接
 */
var WorkerFarm = require('worker-farm');

var workers = WorkerFarm(require.resolve('./worker.js'));

var cur = 1;
for(var i = 1; i <= 162; i ++) {
	workers({
		index: i,
		url: 'http://bt8.nl/ebook.php?page=' + i
	}, function (err, ret) {
		if (err) {
			return console.log(err);
		}
		cur ++;
		if (cur === 162) {
			console.log('output: ', ret);
			WorkerFarm.end(workers);
		}
	});
	
}


