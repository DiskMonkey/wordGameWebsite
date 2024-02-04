var startWebServer = function startWebServer()
{
	const express = require('express');
	const path = require('path');

	const app = express();
	const port = process.env.PORT || 8080;



	app.use(express.static(path.join(__dirname, 'dragUtil')));
	app.use(express.static(path.join(__dirname, 'websocketClient')));
	app.use(express.static(path.join(__dirname, 'button')));
	app.use(express.static(path.join(__dirname, 'timer')));
	app.use(express.static(path.join(__dirname, 'scoring')));
	app.use(express.static(path.join(__dirname, 'animation')));

	// add folders to be possibly sent using the below format:
	// app.use(express.static(path.join(__dirname, 'webSocket')));
	// app.use(express.static(path.join(__dirname, 'common')));
	// app.use(express.static(path.join(__dirname, 'assets')));
	// app.use(express.static(path.join(__dirname, 'ttt')));
	// app.use(express.static(path.join(__dirname, 'frontpage')));

	app.listen(port);

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '/dragUtil/dragTest.html'));
	});


	console.log('Server started at http://localhost:' + port);
}

//module.exports.startWebServer = startWebServer;
startWebServer()