/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveQuestion: function (req, res, next) {
            var str = "CALL spSaveQuestion(" + req.body.question_id + ",'" + req.body.question_description + "',"+req.body.topic_id+","+req.body.is_multiple_option+",'"+req.body.answer_explanation+"',"+req.body.company_id+",'" + req.body.created_by +"','" +  req.body.updated_by + "')";
            Question.query(str, function (err, result) {
                if (err) return res.serverError(err); 
                else {
                    if(req.body.options.length>0)
                    {
                        req.body.options.forEach(function(option){
                            var  str = "CALL spSaveQuestionOption(" + option.option_id + ",'" + option.description + "',"+option.is_correct+","+option.question_id+")";
                           Question.query(str, function (err, result) {

                           })

                        });
                            res.json(result);
                    }
                }
            });  
           // res.json("result");
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
    ,
    getQuestionByQuestionID: function (req, res) {
        var question_id = req.param('question_id');
        if(question_id==0)return res.json([]);
       Question.findOne({question_id:question_id}).exec(function(err,result){
            if (err) return res.serverError(err); 
            else{
                 QuestionOption.find({ question_id: question_id })
            .exec(function(err, options){
                if (err) return res.serverError(err); 
                else{
                    result.options=options;
                     return res.json(result);
                }
        })
               
            }
        })
    }
    
};

