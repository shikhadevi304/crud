
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

var mongoose = require('mongoose');

var showtimeSchema = mongoose.Schema({

  showtimeName: String

 });

var Showtime = mongoose.model('Showtime', showtimeSchema, 'showtime');

//Movie
router.get('/getShowtime', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Showtime.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/getShowtime/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Showtime.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});
console.log("connected to showtime");
router.post('/addShowtime', function(req, res){

 console.log(req.body);

  var name = req.body.showtimeName;

  var showtime = new Showtime({

    showtimeName: name

  });


  showtime.save(function(err, docs){
    if ( err ) throw err;
    console.log("Showtime Saved Successfully");
    res.json(docs);
  });


  })

router.delete('/deleteShowtime/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Showtime.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateShowtime/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);

    Showtime.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      console.log(data);
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
