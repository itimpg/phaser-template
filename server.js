var express = require('express');
var app = express();

app.set('views', 'wwwroot');
app.set('view engine', 'html');
app.use(express.static('wwwroot'));

app.get('/', function(req,res){
    res.render('index');
});

app.listen(3000);