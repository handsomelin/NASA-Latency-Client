var http = require('http')
var ping = require('net-ping')
var schedule = require('node-schedule')
var getmac = require('getmac').getMac
var localip = require('local-ip')
var interface = 'ens33'

var j = schedule.scheduleJob('10 * * * * *', function(){
	var data = {
		mac: null,
		privateIP: null,
		latency: null
	}

	var req = new http.ClientRequest({
		hostname: "www.google.com",
		port: 80,
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
			getmac(function(error, macAddr){
				data.mac = macAddr
				localip(interface, function(error, lip){
					data.privateIP = lip
					callback(data)
				})
				
			})
		})
	}

	getLatency('8.8.8.8', data, function(data){
		req.end(JSON.stringify(data), function(){
			console.log(data)
		})
	})
})

