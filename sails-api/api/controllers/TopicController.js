/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveTopic: function (req, res, next) {
            var str = "CALL spSaveTopic(" + req.body.topic_id + ",'" + req.body.topic_title + "','" + req.body.created_by +"','" +  req.body.updated_by + "')";
            Topic.query(str, function (err, success) {
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

    getAllTopic: function (req, res) {
        Topic.find().exec(function(err,topic){
            if(err){
                console.log(err);
                return res.json(err);
            }
            else{
                return res.json(topic);
            }
        })
        
        
    }  
};

