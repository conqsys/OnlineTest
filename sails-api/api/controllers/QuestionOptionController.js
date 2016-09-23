/**
 * QuestionOptionController
 *
 * @description :: Server-side logic for managing Questionoptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
 // get QuestionOptions by question_id from  database
	getQuestionOptions: function (req, res) {
        var question_id = req.param('question_id');
        QuestionOption.find({ question_id: question_id })
            .exec(function(err, result){
                if (err) return res.serverError(err); 
                else return res.json(result);
        })
    }
};

