/**
 * Online-testController
 *
 * @description :: Server-side logic for managing online-tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // save Test details into database 
    saveOnlineTest: function (req, res, next) {
        var start_date = req.body.test_start_date.split("/");
        req.body.test_start_date = start_date[2] + "-" + start_date[1] + "-" + start_date[0];
        var end_date = req.body.test_end_date.split("/");
        req.body.test_end_date = end_date[2] + "-" + end_date[1] + "-" + end_date[0];
        var str = "CALL spSaveOnlinetest(" + req.body.online_test_id + "," + req.body.company_id + ",'" + req.body.online_test_title + "','" + req.body.test_start_date + "','" + req.body.test_start_time + "','" + req.body.test_end_date + "','" + req.body.test_end_time + "'," + req.body.question_set_id + ",'" + req.body.test_support_text + "'," + req.body.test_experience_years + ",'" + req.body.created_by + "','" + req.body.updated_by + "')";
        OnlineTest.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        });
    },
    // get Tests from  database  
    getOnlineTests: function (req, res) {
        OnlineTest.find().exec(function (err, result) {
            if (err) {
                return res.serverError(err);
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    result[i].test_start_date = result[i].test_start_date.getDate() + "/" + result[i].test_start_date.getMonth() + "/" + result[i].test_start_date.getFullYear();
                    result[i].test_end_date = result[i].test_end_date.getDate() + "/" + result[i].test_end_date.getMonth() + "/" + result[i].test_end_date.getFullYear()
                }
                return res.json(result);
            }
        })
    },
    // get Test from  database 
    getOnlineTest: function (req, res) {
        var online_test_id = req.param('online_test_id');
        var company_id = req.param('company_id');
        OnlineTest.findOne({ online_test_id: online_test_id, company_id: company_id }).exec(function (err, result) {
            if (err) {
                return res.serverError(err);
            }
            else {
                result.test_start_date = result.test_start_date.getDate() + "/" + result.test_start_date.getMonth() + "/" + result.test_start_date.getFullYear();
                result.test_end_date = result.test_end_date.getDate() + "/" + result.test_end_date.getMonth() + "/" + result.test_end_date.getFullYear()
                var onlineTest = result;
                onlineTest.onlineTestUsers = [];
                var str = "call spGetOnlineTestUser(" + online_test_id + "," + company_id + ")";
                OnlineTest.query(str, function (err, result) {
                    if (err) {
                        return res.serverError(err);
                    }
                    else {
                        onlineTest.onlineTestUsers = result[0];
                        return res.json(onlineTest);
                    }
                })
            }
        })
    },
    //  // remove Test from  database 
    removeTest: function (req, res) {
        var online_test_id = req.param('online_test_id');
        var str = "delete from  onlinetest where online_test_id =" + online_test_id;
        OnlineTest.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        })
    }
};

