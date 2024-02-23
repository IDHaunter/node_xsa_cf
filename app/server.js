const
    nodePort = 8080,
    express = require( 'express' ),
    app = express(),
    http = require( 'http' ),
    server = http.createServer( app ),
    os = require('os')
    ;

app.get( '/', ( req, res ) => {
    res.send(`Hello World from ${os.hostname()}!`)
});

server.listen( nodePort );

console.log( `Express server listening on port ${server.address().port} in ${app.settings.env} mode` );