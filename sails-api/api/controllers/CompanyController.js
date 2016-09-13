/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		saveCompany: function (req, res, next) {
            var str = "CALL spSaveCompany(" + req.body.company_id + ",'" + req.body.company_title + "','" + req.body.company_url + "','" + req.body.company_address + "','" + req.body.company_phone + "','" + req.body.company_email + "','" + req.body.company_hr_phone + "','"  + req.body.company_hr_emailid + "','"  + req.body.created_by +"','" +  req.body.updated_by + "')";
            Company.query(str, function (err, success) {
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
     getAllCompanies: function (req, res) {
        Company.find().exec(function(err,companies){
            if(err){
                console.log(err);
                return res.json(err);
            }
            else{
                return res.json(companies);
            }
        })
    },
     getCompanyByID: function (req, res) {
          var companyId = req.param('company_id');
        Company.findOne({company_id:companyId}).exec(function(err,company){
            if(err){
                console.log(err);
                return res.json(err);
            }
            else{
                return res.json(company);
            }
        })
    } 
};

