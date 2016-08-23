
var mysql = require('mysql');
var async = require('async');
var db_config = require('../../Config.json');
var config = db_config.database_info;

var mysql = require('mysql');
var async = require('async');
var db_config = require('../../Config.json');
var config = db_config.database_info;


exports.getContactListbyContactid = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            var str = "call officecqs.spGetContactDetailByContactID("+req.query.Con_ID+")";
            _conn.query(str, function (err, contactlist) {

                if (err) {
                    console.log(err);

                }
                else {
                  
                    console.log(contactlist);
                    res.send(contactlist);
                }
            })

        }
    });

}




exports.insert_update_contact = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            if (req.body.status == 0) {
                //write update code 
                var str = "CALL officecqs.spSaveContactDetails(" + req.body.Con_ID + ",'" + req.body.Con_Name + "'," + req.body.IsActive + "," + req.body.Cmp_ID + ",'" + req.body.ContactNo + "')";
            }
            else {
                //write insert query
                var Contact_ID = 0;
                var str = "CALL officecqs.spSaveContactDetails(" + Contact_ID + ",'" + req.body.new_Con_Name + "'," + req.body.new_IsActive + "," + req.body.Cmp_ID + ",'" + req.body.new_ContactNo + "')";
                // var str="CALL officecqs.spSaveContactDetails("+req.body.new_Contact+",'"+req.body.new_IsActive+"','"+req.body.Cmp_ID+"',,'"+req.body.new_Phone+"')";

            }
            _conn.query(str, function (err, contact_response) {

                if (err) {
                    console.log(err);

                }
                else {

                    res.send(contact_response[0][0]);
                }
            })

        }
    });

}

exports.getAllContactDetails = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            var str = "SELECT * FROM officecqs.comp_contacts;";
            _conn.query(str, function (err, contactDetail) {

                if (err) {
                    console.log(err);

                }
                else {

                    console.log(contactDetail);
                    res.send(contactDetail);
                }
            })

        }
    });

}

exports.getAllContactDetail = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
           
            var str = "SELECT * FROM officecqs.comp_contacts where Cmp_ID="+req.query.Cmp_ID;
          
            _conn.query(str, function (err, contactDetail) {

                if (err) {
                    console.log(err);

                }
                else {

                    console.log(contactDetail);
                    res.send(contactDetail);
                }
            })

        }
    });

}

 
exports.DeleteContact = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            var str = "call spDeleteContactbyContactID("+req.query.Con_ID+")";
            _conn.query(str, function (err, contactDetail) {

                if (err) {
                    console.log(err);

                }
                else {

                   res.send('Success');
                }
            })

        }
    })
}
