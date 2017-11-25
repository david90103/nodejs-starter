//  OpenShift sample Node application
var express = require('express'),
    app = express()
    
app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var db = null,
    dbDetails = new Object();


app.get('/', function (req, res) {
    res.render('index.html', { pageCountMessage : null});
});

app.get('/pagecount', function (req, res) {
    res.send('{ pageCount: -1 }');
  
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something happened!');
});


app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
