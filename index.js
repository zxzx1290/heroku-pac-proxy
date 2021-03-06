var express = require('express');
var app = express();
var request = require('request');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function(req, res) {
    request({
        method: 'GET',
        url: 'http://pac.uku.im/regex',
    }, function(error, ret, body) {
        res.send(body);
    });
});

app.get('/openstreetmap', function(req, res) {
    if(isNaN(req.query.id) ){
        res.end("error");
        return;
    }
    request({
        method: 'GET',
        url: 'http://polygons.openstreetmap.fr/get_geojson.py?id=' + req.query.id + "&params=0",
    }, function(error, ret, body) {
        res.send(body);
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
