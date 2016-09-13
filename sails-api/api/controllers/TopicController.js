/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveTopic: function (req, res, next) {
            var str = "CALL spSaveTopic(" + req.body.topic_id + ",'" + req.body.topic_title + "','" + req.body.company_id + "','" + req.body.created_by +"','" +  req.body.updated_by + "')";
            Topic.query(str, function (err, result) {
                if (err) return res.serverError(err); 
                else return res.json(result);
            });  
    },

    getAllTopic: function (req, res) {
        var companyId = req.param('company_id');
        Topic.find({ company_id: companyId }).exec(function(err,results){
            if (err) return res.serverError(err); 
                else return res.json(results);
        })    
    },
    getTopic: function (req, res) {
        var topicId = req.param('topic_id');
        Topic.find({ topic_id: topicId }).exec(function(err,results){
            if (err) return res.serverError(err); 
                else return res.json(results);
        })    
    },
     removeTopic: function (req, res) {
        var topicId = req.param('topic_id');
         var str = "delete from  topic where topic_id ="+ topicId;
        Topic.query(str, function (err, result){
            if (err) return res.serverError(err); 
                else return res.json(result);
        })    
    }    
};

