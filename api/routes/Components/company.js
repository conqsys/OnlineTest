var mysql = require('mysql');
var async = require('async');
var db_config = require('../../Config.json');
var config = db_config.database_info;

var mysql = require('mysql');
var async = require('async');
var db_config = require('../../Config.json');
var config = db_config.database_info;

exports.getCompanyDetail = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            var str = "SELECT * FROM officecqs.viewcompanydetails;";
            _conn.query(str, function (err, companydetail) {

                if (err) {
                    console.log(err);

                }
                else {
                  
                    console.log(companydetail);
                    res.send(companydetail);
                }
            })

        }
    });

}


exports.getCompany_info = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            var str = "call officecqs.spGetCompanyDetailByCompanyID("+req.query.Cmp_ID+")";
            _conn.query(str, function (err, companydetail) {

                if (err) {
                    console.log(err);

                }
                else {
                  
                    console.log(companydetail);
                    res.send(companydetail);
                }
            })

        }
    });

}


 
 exports.insert_update_company = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            
          if(req.body.status==1){
           if(req.body.new_Name!=undefined && req.body.new_Name!=null && req.body.new_Name!=''){
            //write update code 
              var Cmp_ID=0;
              var str="CALL officecqs.spSaveCompanyDetails("+Cmp_ID+",'"+req.body.new_Name+"','"+req.body.new_Phone+"')";


          }}
           
           else{
               if(req.body.Name!=undefined && req.body.Name!=null && req.body.Name!=''){
               var str="CALL officecqs.spSaveCompanyDetails("+req.body.Cmp_ID+",'"+req.body.Name+"','"+req.body.Phone+"')";
            //write insert query
          
           }}
            _conn.query(str, function (err, Cmp_ID) {

                if (err) {
                    console.log(err);

                }
                else {
                  
                  res.send(Cmp_ID[0][0]);
                }
            })

        }
    });

}

exports.DeleteCompanybyID = function (req, res, next) {
    var _conn = new mysql.createConnection(config);
    console.log(config);
    //  var _request = new sql.Request(_conn);
    _conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            var str = "call spDeleteCompanybyID("+req.query.Cmp_ID+")";
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


// exports.Deletecallbycallid = function (req, res, next) {
//     var _conn = new mysql.createConnection(config);
//     console.log(config);
//     //  var _request = new sql.Request(_conn);
//     _conn.connect(function (err) {
//         if (err) {
//             console.log(err);
//             return;
//         } else {
//             var str = "DELETE FROM comp_calls where Call_ID=";
//             _conn.query(str, function (err, contactDetail) {

//                 if (err) {
//                     console.log(err);

//                 }
//                 else {

//                     console.log(contactDetail);
//                     res.send(contactDetail);
//                 }
//             })

//         }
//     });

// }












