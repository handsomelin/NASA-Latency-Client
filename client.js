var https = require('https')
var ping = require('net-ping')

var exec = require('child_process').exec

var data = {
	latency: null
}

/*
function getData(jsonData, b, callback){
	exec('ping -c 10 8.8.8.8 | tail -n 1 | sed \'s/\\\// /g\' | awk \'{print $8}\'').stdout.on('data', function(dd){
		dd = dd.replace(/\n/g,"")
		jsonData.latency = dd
//		console.log(jsonData)
		b = JSON.stringify(jsonData)
		callback(b)
	})
}
*/
var req = new https.request({
	hostname: "www.google.com",
	port: 443,
	path: "/",
	method: "POST"
})
/*
getData(d, body, function(body){
	req.end(body, function(){
		console.log(body)
	})
})
*/

var session = ping.createSession()

function getLatency(target, data, callback){
	session.pingHost(target, function(error, target, sent, rcvd){
		var ms = rcvd - sent
		if(error)
			console.log(target + ": " + error.toString())
		else{
			data.latency = ms
//			console.log(ms)
		}
		callback(data)
	})
}

getLatency('8.8.8.8', data, function(data){
	req.end(JSON.stringify(data), function(){
		console.log(data)
	})
})