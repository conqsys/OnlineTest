/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveQuestion: function (req, res, next) {
            var str = "CALL spSaveCategory(" + req.body.CategoryID + ",'" + req.body.CategoryName + "','" + req.body.CreatedBy +"','" +  req.body.ModifiedBy + "')";
            // Question.query(str, function (err, result) {
            //     if (err) return res.serverError(err); 
            //     else {
            //         res.send(result);
            //     }
            // });  
            res.json("result");
    },
    getQuestions: function (req, res) {
        var companyId = req.param('company_id');
        Question.find({company_id:companyId}).exec(function(err,result){
            if (err) return res.serverError(err); 
            else{
                return res.json(result);
            }
        })
    },
    getQuestionsByTopic: function (req, res) {
        var topicId = req.param('topic_id');
        var str = "CALL spGetQuestionsByTopic(" + topicId + ")";
        Question.query(str, function (err, result) {
            if (err) return res.serverError(err); 
            else{
                return res.json(result[0]);
            }
        })
    }
};

