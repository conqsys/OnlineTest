/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveQuestion: function (req, res, next) {
            var str = "CALL spSaveCategory(" + req.body.CategoryID + ",'" + req.body.CategoryName + "','" + req.body.CreatedBy +"','" +  req.body.ModifiedBy + "')";
            Question.query(str, function (err, success) {
                returnObject={success:false,data:err };
                if (err) {
                    console.log(err);
                    res.send(returnObject);
                }
                else {
                    returnObject.success=true;
                    returnObject.data=success;
                    res.send(returnObject);
                }
            });  
    },
     getQuestions: function (req, res) {
        Question.find().exec(function(err,questions){
            if(err){
                console.log(err);
                return res.json(err);
            }
            else{
                return res.json(questions);
            }
        })
        
        
    }  

};

