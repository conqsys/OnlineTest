/**
 * QuestionSetController
 *
 * @description :: Server-side logic for managing Questionsets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // get QuestionSets by company_id from  database
    getQuestionSets: function (req, res) {
        var companyId = req.token.user.company_id;
        QuestionSet.find({ company_id: companyId })
            .exec(function (err, result) {
                if (err) {
                    return res.serverError(err);
                } else {
                    return res.json(result);
                }
            })
    },
    // get QuestionSets by company_id and question_id from  database
    getQuestionSet: function (req, res) {
        var companyId = req.token.user.company_id;
        var quesSetId = req.param('question_set_id');

        QuestionSet.findOne({ company_id: companyId, question_set_id: quesSetId })
            .exec(function (err, result) {
                if (err) {
                    return res.serverError(err);
                } else {
                    var obj = result;
                    obj.question_set_questions = [];
                    //return res.json(questionSet);

                    var str = "CALL spGetQuestionSetQuestions(" + quesSetId + "," + companyId + ")";
                    QuestionSet.query(str, function (err, result) {
                        if (err) {
                            return res.serverError(err);
                        } else {
                            if (result[0].length == 1 && result[0][0].question_set_id == null)
                                obj.question_set_questions = [];
                            else
                                obj.question_set_questions = result[0];

                            return res.json(obj);
                        }
                    })
                }
            })
    },
    // get QuestionSets by user_id from  database
    getQuestionSetsbyUser: function (req, res) {
        var userId = req.param('user_id');
        var str = "CALL spGetQuestionSets(" + userId + ")";
        QuestionSet.query(str, function (err, result) {
            if (err) {
                return res.serverError(err);
            } else {
                for (var i = 0; i < result[0].length; i++) {
                    result[0][i].test_completed_date = result[0][i].test_completed_date.getDate() + "-" + result[0][i].test_completed_date.getMonth() + "-" + result[0][i].test_completed_date.getFullYear();
                    // result[i].test_end_date = result[i].test_end_date.getDate()+"/"+result[i].test_end_date.getMonth()+"/"+result[i].test_end_date.getFullYear();
                    result[0][i].total_time = toSeconds(result[0][i].total_time);
                    result[0][i].test_start_time = tConvert(result[0][i].test_start_time);
                    result[0][i].test_end_time = tConvert(result[0][i].test_end_time);

                }
                return res.json(result[0]);
            }
        });
    },

    // save QuestionSets into database
    saveQuestionSet: function (req, res) {

        var question_set_questions = req.body.question_set_questions;

        var companyId = req.token.user.company_id;
        var createdBy = req.token.user.user_id;

        var str = "CALL spSaveQuestionSet(" + req.body.question_set_id + ",'"
            + req.body.question_set_title + "','"
            + req.body.total_time + "',"
            + companyId + ","
            + req.body.total_questions + ","
            + req.body.is_randomize + ",'"
            + req.body.option_series_id + "','"
            + createdBy + "','"
            + createdBy + "')";
        QuestionSet.query(str, function (err, result) {
            if (err) {
                return res.serverError(err);
            } else {
                var question_set_id = result[0][0].id;
                if (question_set_questions.length > 0) {
                    var j = 0;
                    for (var i = 0; i < question_set_questions.length; i++) {
                        if (question_set_questions[i].question_set_question_id === 0) {
                            str = "CALL spSaveQuestionSetQuestion(" + question_set_questions[i].question_set_question_id + "," + question_set_id + "," + question_set_questions[i].question_id + ")";
                        } else if (question_set_questions[i].is_deleted === 1) {
                            str = "CALL spDeleteQuestionSetQuestion(" + question_set_questions[i].question_set_question_id + ")";
                        } else {
                            str = "";
                        }
                        if (str != "") {
                            QuestionSet.query(str, function (err, result) {
                                if (err) {
                                    return res.serverError(err);
                                } else {
                                    if (j == question_set_questions.length - 1) {
                                        return res.json(result);
                                    }
                                }
                                j++;
                            })
                        } else {
                            if (j == question_set_questions.length - 1) {
                                return res.json(question_set_id);
                            }
                            j++;
                        }
                    }
                }
                else
                    return res.json(question_set_id);
            }
        })
    }
};

function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[3] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}
function toSeconds(time_str) {
    // Extract hours, minutes and seconds
    var parts = time_str.split(':');
    // compute  and return total seconds
    return parts[0] * 60 + // an hour has 3600 seconds
        parts[1] * 1; // a minute has 60 seconds
       // parts[2]; // seconds
}
