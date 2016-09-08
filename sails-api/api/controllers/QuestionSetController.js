/**
 * QuestionSetController
 *
 * @description :: Server-side logic for managing Questionsets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getQuestionSets: function (req, res) {
        var companyId = req.param('company_id');
        QuestionSet.findOne({ company_id: companyId })
            .exec(function(err,questionSets){
                console.log('asd')
                if (err) {
                    return res.json({ 
                        error: err 
                    });
                }
                if (questionSets === undefined) {
                    console.log('notFound')
                    return res.notFound();
                } 
                else {
                    console.log('Found')
                    return res.json({
                        notFound: false,
                        questionSetData: questionSets
                    });
                }
        })
        
        
    }
};

