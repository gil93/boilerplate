var	express = require( 'express' ),
	morgan = require( 'morgan' ),
	body_parser = require( 'body-parser' ),
	app = express(),
	port = process.env.PORT || 8080
;

app.use( body_parser.urlencoded( { extended: true } ) );

app.use( body_parser.json() );

app.use( morgan( 'dev' ) );

app.use( '/public/', express.static( __dirname + '/public/' ) );

app.get( '*', ( req, res ) => {

	res.sendFile( __dirname + '/index.html' );

});

app.listen( port );

console.log( 'Listening on port ' + port + '!' );