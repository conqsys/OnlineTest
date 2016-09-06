/**
 * StudentController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getAll: function (req, res) {
        Student.find().exec(function(err,students){
            if(err){
                console.log(err);
                return res.json(err);
            }
            else{
                return res.json(students);
            }
        })
        
        
    }
};

