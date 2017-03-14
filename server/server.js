var app = require('./app');
var db = require('./dbinit')

var port = 80;

app.app.listen(port, function() {
  console.log('server initialized.');
  console.log('listening on port', port);
});