/**
 * QuestionSetController
 *
 * @description :: Server-side logic for managing Questionsets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // get QuestionSets by company_id from  database
    getQuestionSets: function (req, res) {
        var companyId = req.param('company_id');
        QuestionSet.find({ company_id: companyId })
            .exec(function (err, result) {
                if (err) return res.serverError(err);
                else return res.json(result);
            })
    },
    // get QuestionSets by company_id and question_id from  database
    getQuestionSet: function (req, res) {
        var companyId = req.param('company_id');
        var quesSetId = req.param('question_set_id');

        QuestionSet.findOne({ company_id: companyId, question_set_id: quesSetId })
            .exec(function (err, result) {
                if (err) return res.serverError(err);
                else {
                    var obj = result;
                    obj.question_set_questions = [];
                    //return res.json(questionSet);

                    var str = "CALL spGetQuestionSetQuestions(" + quesSetId + "," + companyId + ")";
                    QuestionSet.query(str, function (err, result) {
                        if (err) return res.serverError(err);
                        else {
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
    getQuestionSetsbyUser : function (req, res) {
        var userId = req.param('user_id');
        var str = "CALL spGetQuestionSets(" + userId + ")";
        QuestionSet.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else {
                 return res.json(result[0]);
            }
        });
    },

    // save QuestionSets into database
    saveQuestionSet: function (req, res) {

        var question_set_questions = req.body.question_set_questions;

        var str = "CALL spSaveQuestionSet(" + req.body.question_set_id + ",'"
            + req.body.question_set_title + "','"
            + req.body.total_time + "',"
            + req.body.company_id + ","
            + req.body.total_questions + ","
            + req.body.is_randomize + ",'"
            + req.body.option_series + "','"
            + req.body.created_by + "','"
            + req.body.updated_by + "')";
        QuestionSet.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else {
                var question_set_id = result[0][0].id;
                if (question_set_questions.length > 0) {
                    for (var i = 0; i < question_set_questions.length; i++) {
                        if (question_set_questions[i].set_question_id === 0) {
                            str = "CALL spSaveSetQuestion(" + question_set_questions[i].set_question_id + "," + question_set_id + "," + question_set_questions[i].question_id + ")";
                        } else if (question_set_questions[i].is_deleted === 1) {
                            str = "CALL spDeleteSetQuestion(" + question_set_questions[i].set_question_id + ")";
                        } else {
                            str = "";
                        }
                        if (str != "") {
                            QuestionSet.query(str, function (err, result) {
                                if (err) return res.serverError(err);
                                else {
                                    if (i == question_set_questions.length - 1) {
                                        return res.json(result);
                                    }
                                }
                            })
                        } else {
                            if (i == question_set_questions.length - 1) {
                                return res.json(question_set_id);
                            }
                        }
                    }
                }
                else
                    return res.json(question_set_id);
            }
        })
    }
};

