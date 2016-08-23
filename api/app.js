
/**
 * Module dependencies.
 */

var express = require('express');
var session = require('express-session');
var db_config = require('./Config.json');
//var routes = require('./routes');
var user = require('./routes/user');
var company = require('./routes/Components/company');
var call = require('./routes/Components/call');
var contact = require('./routes/Components/contact');

var captchapng = require('captchapng');
var crypto = require("crypto");
var multer = require('multer');

var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})
var upload = multer({ storage: storage })

var fs = require('fs');
var util = require('util');
//var common    = require('./routes/common')

var http = require('http');
var path = require('path');


  

var app = express();
app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(session({
    secret: 'keyboard cat',
    userID:''

}));



// all environments
//app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/boximages'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use('/ArticalImage', express.static('ArticalImage'));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/uploads' }));
//app.use(express.static(__dirname + '/static'));
app.use(express.errorHandler());

app.use('/boximages', express.static('boximages'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/getCompanyDetail', company.getCompanyDetail);
app.get('/getCompany_info', company.getCompany_info);
app.post('/insert_update_company',company.insert_update_company);
// app.get('/deletecompany', company.DeleteCompanybyID);





app.post('/insert_update_contact',contact.insert_update_contact);
app.get('/getAllContactDetail',contact.getAllContactDetail);
app.get('/getAllContactDetails',contact.getAllContactDetails);
 
app.get('/deletecontact',contact.DeleteContact);


app.get('/getcall_info_update',call.getcall_info_update);
app.get('/getcallinfo',call.getcallDetailByCallID);
app.post('/savecallinfo',call.SaveCallDetails);
app.get('/deletecall',call.Deletecallbycallid);








var server = app.listen(6060, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})

