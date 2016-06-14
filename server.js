var http = require('http');

const PORT = process.env.PORT || 3000;

//We need a function which handles requests and send response
function handleRequest(req, res){
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if(req.method == 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      console.log("Body: " + body);
    });
    switch(req.url) {
      case '/reg':
        res.end('reg');
        return;
      case '/report':
        res.end('reg');
        return;
    }
  } else {
    switch(req.url) {
      case '/':
        res.end('hello, world!');
        return;
      case '/list':
        res.end('');
        return;
    }
  }
  res.statusCode = 404;
  res.end();
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
