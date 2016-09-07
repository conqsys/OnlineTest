/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	saveCategory: function (req, res, next) {
            var str = "CALL spSaveCategory(" + req.body.CategoryID + ",'" + req.body.CategoryName + "','" + req.body.CreatedBy +"','" +  req.body.ModifiedBy + "')";
            Category.query(str, function (err, success) {
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
    }

    
};

