var http = require('http')
var ping = require('net-ping')
var schedule = require('node-schedule')
var getmac = require('getmac').getMac
var localip = require('local-ip')
var interface = 'ens33'

var reqReg = new http.ClientRequest({
	hostname: 'www.google.com',
	port: 80,
	path: '/reg',
	method: 'POST'
})

var dataReg = {
	mac: null,
	ip_local: null
}

function reg(dataReg, callback){
	getmac(function(error, macAddr){
		dataReg.mac = macAddr
		localip(interface, function(error, lip){
			dataReg.ip_local = lip
			callback(dataReg)
		})
	})
}

reg(dataReg, function(dataReg){
	reqReg.end(JSON.stringify(dataReg), function(){
			console.log(dataReg)
	})
})

var j = schedule.scheduleJob('5 * * * * *', function(){
	var data = {
		mac: null,
		privateIP: null,
		latency: null
	}

	var req = new http.ClientRequest({
		hostname: 'www.google.com',
		port: 80,
		path: '/report',
		method: 'POST'
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

