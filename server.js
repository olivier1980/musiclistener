/* jshint node: true */

var express = require('express');
var bodyParser = require('body-parser');

module.exports = function (API_KEY) {
    var artist, album, track, end;
    var app = express();

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Headers", "Authorization, Accept, Content-Type");
        res.header("Access-Control-Allow-Methods", "POST, GET");
        res.header("Access-Control-Max-Age", 1000 * 60 * 60 * 24);
        next();
    });

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/getSong', function (req, res) {

        const apikey = req.query.key ?? '';
        if (apikey !== API_KEY) {
            res.sendStatus(403);
            return
        }

        var now = Date.now() / 1000;

        // Check if song runtime has expired
        if (now < end ) {
            return res.json({
                artist: artist,
                album: album,
                track: track,
            });
        }

        res.sendStatus(200);
    });

    app.post('/pushSong', function (req, res, next) {
        const apikey = req.query.key ?? '';
        if (apikey !== API_KEY) {
            res.sendStatus(403);
            return
        }

        var data = req.body.data.split('____');

        artist = data[0];
        album = data[1];
        track = data[2];
        length = data[3]/1000;

        // Set end timestamp when the song should be cleared
        end = (Date.now() / 1000) + length;

        next();
    });

    app.use(function (err, req, res, next) {
        if (!err.statusCode) return next(err);

        if (err.message) {
            res.status(err.statusCode).sendStatus(err.message);
        }
        else {
            res.sendStatus(err.statusCode);
        }
    });

    return app;
};

