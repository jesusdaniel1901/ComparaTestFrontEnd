var express  = require('express');
var cors = require('cors')

//create our app

var app = express();

app.use(cors());



app.use(express.static('public'));

app.listen(3001,function() {
  
  console.log('Express server is up in port 3001');
  
});
