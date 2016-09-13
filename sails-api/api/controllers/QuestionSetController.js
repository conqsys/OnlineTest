/**
 * QuestionSetController
 *
 * @description :: Server-side logic for managing Questionsets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getQuestionSets: function (req, res) {
        var companyId = req.param('company_id');
        QuestionSet.find({ company_id: companyId })
            .exec(function(err, result){
                if (err) return res.serverError(err); 
                else return res.json(result);
        })
    },

    getQuestionSet: function(req, res) {
        var companyId = req.param('company_id');
        var quesSetId = req.param('question_set_id');

        QuestionSet.findOne({ company_id: companyId, question_set_id: quesSetId })
            .exec(function(err, result){
                if (err) return res.serverError(err); 
                else {
                    var obj = result;
                    obj.question_set_questions = [];
                    //return res.json(questionSet);

                    var str = "CALL spGetQuestionSetQuestions(" + quesSetId + "," + companyId + ")";
                    QuestionSet.query(str, function (err, result) {
                        if(err) return res.serverError(err);
                        else {
                            if(result[0].length==1 && result[0][0].question_set_id == null)
                                obj.question_set_questions = [];
                            else 
                                obj.question_set_questions = result[0];

                            return res.json(obj);
                        }
                    })
                }
            })
    },

    saveSetQuestion: function(req, res) {
        var question_set_id = req.body.question_set_id;
        var question_set_questions = req.body.question_set_questions;
        var j = 0;
        for (var i = 0; i < question_set_questions.length; i++) {
            var str = "CALL spSaveSetQuestion(" + question_set_questions[i].set_question_id + "," + question_set_questions[i].question_set_id + "," + question_set_questions[i].question_id + ")";
            QuestionSet.query(str, function (err, result) {
                if(err) return res.serverError(err);
                else {

                    return res.json(result);
                }
                //j++;
            })
        }
        
    }
};

