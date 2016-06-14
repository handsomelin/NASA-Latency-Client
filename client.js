var https = require('https')
var exec = require('child_process').exec

var d = {
	latency: null
}

var body

function getData(jsonData, b, callback){
	exec('ping -c 10 8.8.8.8 | tail -n 1 | sed \'s/\\\// /g\' | awk \'{print $8}\'').stdout.on('data', function(dd){
		dd = dd.replace(/\n/g,"")
		jsonData.latency = dd
//		console.log(jsonData)
		b = JSON.stringify(jsonData)
		callback(b)
	})
}

var req = new https.request({
	hostname: "www.google.com",
	port: 443,
	path: "/",
	method: "POST",
	headers: {
		"Content-Type": "application, json",
		"Content-Length": Buffer.byteLength(body)
	}
})

getData(d, body, function(body){
	req.end(body, function(){
		console.log(body)
	})
})

