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
            .exec(function(err,questionSets){
                if (err) {
                    return res.serverError(err);
                }
                if (questionSets === undefined) {
                    return res.notFound();
                } 
                else {
                    return res.json(questionSets);
                }
        })
    },

    getQuestionSet: function(req, res) {
        var companyId = req.param('company_id');
        var quesSetId = req.param('question_set_id');

        QuestionSet.findOne({ company_id: companyId, question_set_id: quesSetId })
            .exec(function(err, questionSet){
                if(err) {
                    return res.serverError(err)
                }
                if(questionSet === undefined) {
                    return res.notFound();
                }
                else {
                    var obj = questionSet;
                    obj.question_set_questions = [];
                    //return res.json(questionSet);

                    var str = "CALL spGetQuestionSetQuestions(" + quesSetId + "," + companyId + ")";
                    QuestionSet.query(str, function (err, questions) {
                        if(err) {
                            return res.serverError(err);
                        }
                        else {
                            obj.question_set_questions = questions[0];
                            //var obj = { questionSet: questionSet, questions: questions }
                            return res.json(obj);
                        }
                    })
                }
            })
    }
};

