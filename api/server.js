var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var config = require(__dirname+'/config.js');
var password = require('password-hash-and-salt');




var mongoose = require('mongoose');
var options = {
    user: config.mongo.user,
    pass: config.mongo.pass
};
mongoose.connect('mongodb://'+config.mongo.server,options);




var Gallery = mongoose.model('galleries', { key: String, pass: String, blocks: Array });



app.use(bodyParser.json({
    'extended': true,
    'limit': '50mb'
}));


app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth');

    res.header( "Pragma", "no-cache" );
    res.header( "Cache-Control", "no-cache" );
    res.header( "Expires", 0 );

    next();
});







app.get('/', function (req, res) {

    res.send('Galleries API');




});




app.get('/galleries', function (req, res) {


    Gallery.find({}, function (err, galleries) {

        var galleries_keys = [];
        for(var _id in galleries){
            galleries_keys.push(galleries[_id].key);
        }
        res.send(galleries_keys);


    });


});








app.get('/galleries/*', function (req, res) {

    var pathname = req._parsedUrl.pathname.split('/');
    var gallery_key = pathname[2];


    Gallery.findOne({ key: gallery_key }, function (err, gallery){

        if(gallery){


            var pass = req.headers['x-auth'];
            //console.log(req.headers);
            if(pass) {
                password(pass).verifyAgainst(gallery.pass, function (error, verified) {
                    if (error)
                        throw new Error('Something went wrong!');
                    if (!verified) {


                        res.status(403);
                        res.send({'message': 'wrong admin password'});


                    } else {

                        res.send(gallery.blocks);

                    }
                });
            }else{
                res.send(gallery.blocks);
            }





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

            var pass = req.headers['x-auth'];
            password(pass).verifyAgainst(gallery.pass, function(error, verified) {
                if(error)
                    throw new Error('Something went wrong!');
                if(!verified) {


                    res.status(403);
                    res.send({'message': 'wrong admin password'});


                } else {

                    gallery.blocks = req.body;
                    gallery.save();

                    res.send({'message': 'updated'});

                }
            });




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


    var pass = req.headers['x-auth'];
    if(!pass){

        res.status(403);
        res.send({'message': 'you should set admin pass'});

    }else {
        password(pass).hash(function (error, hash) {


            var gallery = new Gallery({key: gallery_key, pass: hash, blocks: req.body});
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
    }

});








app.listen(config.port, function () {
    console.log('Example app listening on port '+config.port+'!');
});



