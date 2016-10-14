/**
 * AnswerController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    saveAns: function (req, res, next) {
        var userId = req.body.question.user_id;
        var qusSetid = req.body.question.question_set_id;
        var selectedOptions = "";
        for (var i = 0; i < req.body.selectedOptions.length; i++) {
            if (i == 0) {
                selectedOptions = req.body.selectedOptions[i].option_id;
            } else {
                selectedOptions = selectedOptions + ',' + req.body.selectedOptions[i].option_id;
            }
        }
        var str = "CALL spSaveAnswer(" + req.body.question.question_id + ",'" + selectedOptions + "'," + req.body.question.online_test_user_id + "," + userId + "," + qusSetid + ")";
        Answer.query(str, function (err, result) {
            if (err) {
                return res.serverError(err);
            }
            else {
                var message = { question: {}, isExist: false };
                if (result[0] && result[0].length > 0) {
                    message.question = result[0][0];
                    message.isExist = true;
                    var str = "CALL spGetQuestionOption(" + message.question.question_id + ")";
                    Question.query(str, function (err, options) {
                        if (err) {
                            return res.serverError(err);
                        }
                        else {
                            message.question.options = options[0];
                            return res.json(message);
                        }
                    })
                }
                else {
                    return res.json(message);
                }
            }
        });
    },

    testTimeOut: function (req, res) {
        var testId = req.body.onlineTestUserId;
        var isTestBegin = req.body.isTestBegin;
        var str = "call spUpdateOnlineTestUser(" + testId + "," + isTestBegin + ")";
        OnlineTest.query(str, function (err, result) {
            if (err) {
                return res.serverError(err);
            }
            else {
                return res.json(result);
            }
        });
    },
     getTestResult: function (req, res) {
        var testId = req.body.onlineTestUserId;
        var str = "call spGetTestResult(" + testId + ")";
        OnlineTest.query(str, function (err, result) {
            if (err) {
                return res.serverError(err);
            }
            else {
                return res.json(result);
            }
        });
    },
};

