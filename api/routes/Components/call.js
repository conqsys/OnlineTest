var mysql = require('mysql');
var async = require('async');
var db_config = require('../../Config.json');
var config = db_config.database_info;

var mysql = require('mysql');
var async = require('async');
var db_config = require('../../Config.json');
var config = db_config.database_info;


exports.getcallDetailByCallID = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            var str = "call officecqs.spGetCallDetailByCallID("+req.query.Call_ID+")";
            _conn.query(str, function (err, callinfo) {

                if (err) {
                    console.log(err);

                }
                else {
                  
                    console.log(callinfo);
                    res.send(callinfo);
                }
            })

        }
    });

}

exports.SaveCallDetails = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            
           if(req.body.Call_ID!=0 && req.body.Call_ID !=undefined){
            //write update code 
            var str="CALL officecqs.spSaveCallDetail("+req.body.Call_ID+",'"+req.body.Name+"','"+ req.body.Call_Startdate+"','"+req.body.Starttime+"','"+req.body.Call_Enddate+"','"+req.body.Endtime+"','"+req.body.call_Status+"','"+req.body.Cmp_ID+"')";
             
           }
           else{
            //write insert query
            var Call_ID=0;
  
            var str="CALL officecqs.spSaveCallDetail("+Call_ID+",'"+req.body.New_Name+"','"+req.body.new_Call_Startdate+"','"+req.body.new_Starttime+"','"+req.body.new_Call_Enddate+"','"+req.body.new_Endtime+"','"+req.body.new_call_Status+"',"+req.body.Cmp_ID+")";


           }
            _conn.query(str, function (err, Call_ID) {

                if (err) {
                    console.log(err);

                }
                else {
                  
                  res.send(Call_ID[0][0]);
                }
            })

        }
    });

}

exports.getcall_info_update = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            var str = "SELECT * FROM officecqs.comp_calls where Cmp_ID="+req.query.Cmp_ID;
            _conn.query(str, function (err, callDetail) {

                if (err) {
                    console.log(err);

                }
                else {
                  
                    
                    res.send(callDetail);
                }
            })

        }
    });

}


exports.Deletecallbycallid = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            var str = "call spDeleteCallbycallid("+req.query.Call_ID+")";
            _conn.query(str, function (err, contactDetail) {

                if (err) {
                    console.log(err);

                }
                else {

                   res.send('Success');
                }
            })

        }
    });

}