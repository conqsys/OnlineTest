/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getAll: function (req, res) {
        Category.find().exec(function(err,categories){
            if(err){
                console.log(err);
                return res.json(err);
            }
            else{
                return res.json(categories);
            }
        })
        
        
    }
};

