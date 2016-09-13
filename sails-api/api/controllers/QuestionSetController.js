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
            .exec(function(err, results){
                if (err) return res.serverError(err); 
                else return res.json(results);
        })
    },

    getQuestionSet: function(req, res) {
        var companyId = req.param('company_id');
        var quesSetId = req.param('question_set_id');

        QuestionSet.findOne({ company_id: companyId, question_set_id: quesSetId })
            .exec(function(err, results){
                if (err) return res.serverError(err); 
                else {
                    var obj = results;
                    obj.question_set_questions = [];
                    //return res.json(questionSet);

                    var str = "CALL spGetQuestionSetQuestions(" + quesSetId + "," + companyId + ")";
                    QuestionSet.query(str, function (err, results) {
                        if(err) return res.serverError(err);
                        else {
                            if(results[0].length==1 && results[0][0].question_set_id == null)
                                obj.question_set_questions = [];
                            else 
                                obj.question_set_questions = results[0];

                            return res.json(obj);
                        }
                    })
                }
            })
    }
};

