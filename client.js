var https = require('https')
var ping = require('net-ping')
var schedule = require('node-schedule')

var j = schedule.scheduleJob('* 5 * * * *', function(){
	var data = {
		latency: null
	}

	var req = new https.request({
		hostname: "www.google.com",
		port: 443,
		path: "/",
		method: "POST"
	})

	var session = ping.createSession()

	function getLatency(target, data, callback){
		session.pingHost(target, function(error, target, sent, rcvd){
			var ms = rcvd - sent
			if(error)
				console.log(target + ": " + error.toString())
			else{
				data.latency = ms
			}
			callback(data)
		})
	}

	getLatency('8.8.8.8', data, function(data){
		req.end(JSON.stringify(data), function(){
			console.log(data)
		})
	})
})

