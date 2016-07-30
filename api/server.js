var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var config = require(__dirname+'/config.js');



var mongoose = require('mongoose');
var options = {
    user: config.mongo.user,
    pass: config.mongo.pass
};
mongoose.connect('mongodb://'+config.mongo.server,options);




var Gallery = mongoose.model('galleries', { key: String, blocks: Array });




app.use(bodyParser.json());// parse application/json


app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});







app.get('/', function (req, res) {

    res.send('Galleries API');




});




app.get('/galleries/*', function (req, res) {

    var pathname = req._parsedUrl.pathname.split('/');
    var gallery_key = pathname[2];


    Gallery.findOne({ key: gallery_key }, function (err, gallery){

        if(gallery){

            res.send(gallery.blocks);

        }else{

            res.status(404);
            res.send({'message': 'not found'});

        }
        /*doc.name = 'jason borne';
        doc.visits.$inc();
        doc.save();*/




    });





});


app.put('/galleries/*', function (req, res) {

    var pathname = req._parsedUrl.pathname.split('/');
    var gallery_key = pathname[2];


    Gallery.findOne({ key: gallery_key }, function (err, gallery){

        if(gallery){

             gallery.blocks = req.body;
             gallery.save();

            res.send({'message': 'updated'});

        }else{

            res.status(404);
            res.send({'message': 'not found'});

        }


    });



});



app.post('/galleries/*', function (req, res) {

    var pathname = req._parsedUrl.pathname.split('/');
    var gallery_key = pathname[2];


    //console.log(req);
    //console.log(req.body);


    var gallery = new Gallery({ key: gallery_key, blocks: req.body });
    gallery.save(function (err) {
        if (err) {
            //console.log(err);

            res.status(403);
            res.send({'message': 'already exists'});

        } else {

            res.send({'message': 'created'});

        }
    });



});








app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});



