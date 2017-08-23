var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  // Check if request is for '/listings'. If not, change statusCode to 404
  if(parsedUrl.path == '/listings') response.end(listingData);
  else {
    response.statusCode = 404;
    response.end('Bad gateway error');
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  // Set listingData equal to the json contents
  listingData = data;

  // Create server
  server = http.createServer(requestHandler);

  // Server is now started, listening for requests on port 8080
  server.listen(port, function() {
    console.log('Server listening on: http://127.0.0.1:' + port);
  });
});
