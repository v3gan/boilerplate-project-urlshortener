const express = require('express');
var path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

var indexRouter = require('./routes/index');
var shorturlRouter = require('./routes/shorturl');

// Basic Configuration
const port = process.env.PORT || 3000;

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.use('/', indexRouter);
app.use('/api/shorturl', shorturlRouter);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
