/**
 * Online-testController
 *
 * @description :: Server-side logic for managing online-tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getAllQuestions: function (req, res, next) {
        QuestionSet.find().exec(function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        })
    },

    saveOnlineTest: function (req, res, next) {
        var str = "CALL spSaveOnlinetest(" + req.body.online_test_id + "," + req.body.company_id + ",'" + req.body.online_test_title + "','" + req.body.test_start_date + "','" + req.body.test_start_time + "','" + req.body.test_end_date + "','" + req.body.test_end_time + "'," + req.body.question_set_id + ",'" + req.body.test_support_text + "'," + req.body.test_experience_years + ",'" + req.body.created_by + "','" + req.body.updated_by + "')";
        OnlineTest.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        });
    },
    getOnlineTests: function (req, res) {
        OnlineTest.find().exec(function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        })
    },
    getOnlineTestByID: function (req, res) {
        var online_test_id = req.param('online_test_id');
        OnlineTest.findOne({ online_test_id: online_test_id }).exec(function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        })
    },
    removeTest: function (req, res) {
        var online_test_id = req.param('online_test_id');
        var str = "delete from  onlinetest where online_test_id =" + online_test_id;
        OnlineTest.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        })
    }
};

