/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    saveCompany: function (req, res, next) {
        var str = "CALL spSaveCompany(" + req.body.company_id + ",'" + req.body.company_title + "','" + req.body.company_url + "','" + req.body.company_address + "','" + req.body.company_phone + "','" + req.body.company_email + "','" 
        + req.body.company_hr_phone + "','"+ req.body.company_hr_emailid+ "','" + req.body.smtp_host + "'," + req.body.smtp_port + ",'" + req.body.smtp_username + "','" + req.body.smtp_password + "','" + req.body.created_by + "','" + req.body.updated_by + "')";
        Company.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        });
    },
    getAllCompanies: function (req, res) {
        Company.find().exec(function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        })
    },
    getCompanyByID: function (req, res) {
        var companyId = req.param('company_id');
        Company.findOne({ company_id: companyId }).exec(function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        })
    }
};

