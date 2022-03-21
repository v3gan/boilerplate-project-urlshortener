var express = require('express');
var ShortUrl = require('../models/shorturl');
var router = express.Router();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.post('/', function (req, res) {
  ShortUrl.countDocuments({}, (err, count) => {
    if (err) {
      res.json({ error: 'error counting: ' + err });
    }
    const shorturl = new ShortUrl({
      original_url: req.body.url,
      short_url: count + 1,
    });
    shorturl.save((err, data) => {
      if (err) {
        res.json({ error: 'error saving: ' + err });
      }
      res.json({ original_url: data.original_url, short_url: data.short_url });
    });
  });
});

router.get('/:shorturl', (req, res) => {
    ShortUrl.findOne({short_url: req.params.shorturl}, (err, data) => {
        if(err){
            res.json({error: 'error getting' + err});
        }
        res.redirect(data.original_url);
    })
})

module.exports = router;
