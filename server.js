var Config = require('./config/config');
var app = require('./app');

/**
 * Start the server
  */
app.listen(Config.app.port);
console.log("Server is listening on port %s", Config.app.port);








