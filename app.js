const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
var Version = require("./models/Version.js");
const path = require('path');

// import models, { connectDb } from './models/Version.js';
const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index.routes'));

mongoose.connect("mongodb://localhost:27017/nuton-api").then(() => {
	console.log('MongoDB connected!');
}).catch(err => {
	console.log(err);
	console.log('\x1b[31m\x1b[1m MongoDB Not Connected');
});

var newVersion = Version({
	"id": 1,
	"versionNumber": "1.0",
	"added": [
		"ListViews durch TableView ersetzt",
		"Punkte werden jetzt mit dem Fenster skaliert",
		"Neues Settings Fenster",
		"Zu ffmpeg können zusätzliche Argumente hinzugefügt werden",
		"Punkte und Eichung können ein- und ausgeblendet werden",
		"Ein neues Theme zum herunterladen",
		"Es wird keine Richtung der Translation in den Einstellungen benötigt, es werden beide Richtungen analysiert",
		"Speichern und Laden von Projekten",
		"Updates können gesucht werden",
		"Trackingfunktion",
		"Rohdaten für Kreisbewegung wurden erweitert"
	],
	"fixed": [
		"Fehler bei den neuen Toolbar-Buttons gefixed",
		"Fehler bei Diagrammen gefixed",
		"ThemeLoader wird nur einmal initialisiert",
		"Fehlermeldung für ffmpeg behoben",
		"Vektoren können nun gelöscht werden"
	],
	"date": "12.06.2018",
	"path": "Nuton_1.0.jar"
});


//newVersion.save(function (err) {
// 	if (err) throw err;
//
// 	console.log('User created!');
//});

// Version.deleteOne({id: 1}, (err, version) => {
// 	if (err) throw err;

// 	// object of all the users
// 	console.log(version + "Version deleted!");
// });

// Version.find({id: 1}, function(err, users) {
// 	if (err) throw err;

// 	// object of all the users
// 	console.log(users);
//   });

app.post('/api/addVersion', function(request, response) {
    console.log(request.body);
    //response.send(request.body);
    var nVersion = Version(request.body);
    nVersion.save(function(err) {
        if(err) {
            response.send(err);
        } else {
            console.log("Added new version!"); 
        } 
    })
});

app.get('/api/versions', function (req, res) {
	res.json();
});

app.get('/download/:file(*)', function (req, res) {
	var file = req.params.file;
	var fileLocation = path.join('./download', file);
	res.download(fileLocation, file);
});

app.listen(process.env.PORT, () => {
	console.log(`Example app listening on port ${process.env.PORT}!`);
})
