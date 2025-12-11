var env = process.env;
var server = require('./server')(env.API_KEY);

var listener = server.listen(env.MUSIC_PORT, function(err) {
    if (err) throw err;

    var host = listener.address().address;
    var port = listener.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});
