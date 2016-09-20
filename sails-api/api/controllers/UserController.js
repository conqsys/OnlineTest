/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var mailService = require('../services/email');

module.exports = {
    getUser: function (req, res) {
        var companyId = req.param('company_id');
        var str = "CALL spGetUsers(" + companyId + ")";
        User.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result[0]);
        })
    },

    getUserById: function (req, res) {
        var companyId = req.param('company_id');
        var userId = req.param('user_id');
        var str = "CALL spGetUserById(" + userId + "," + companyId + ")";
        User.query(str, function (err, result) {
            if (err) return res.serverError(err);
                else if (result == undefined) return res.json({});
                else {
                    delete result[0][0].user_pwd; 
                    return res.json(result[0][0]);
                }
        })
    },

    searchUserByEmail: function (req, res) {
        var emailId = req.param('email_id');
        User.findOne({ user_email: emailId })
            .exec(function(err, result){
                if (err) return res.serverError(err);
                else if (result == undefined) return res.json({});
                else return res.json(result.toJSON());
            })
    },
    
    saveUser: function (req, res) {
        var userData = req.body;
        var pwd = makeid();
        var str = "CALL spSaveUser(" + userData.user_id + ",'" 
                                     + userData.user_name + "','" 
                                     + userData.user_email + "','" 
                                     + userData.user_mobile_no + "','" 
                                     + userData.user_address + "','"
                                     + pwd + "'," 
                                     + userData.is_active + "," 
                                     + userData.is_fresher + "," 
                                     + userData.user_exp_month + "," 
                                     + userData.user_exp_year + "," 
                                     + userData.role_id + ",'" 
                                     + userData.created_by + "','" 
                                     + userData.updated_by + "')";

        User.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else {
                var user_id = result[0][0].id;
                var str = "CALL spSaveCompanyUser(" + userData.company_id + "," + user_id + ")";
                User.query(str, function (err, result) {
                    if (err) return res.serverError(err);
                    else
                        return res.json(result);
                })
            }
        });
    },
    removeUser: function (req, res) {
        var userId = req.param('user_id');
        var str = "delete from  user where user_id =" + userId;
        User.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else return res.json(result);
        })
    },
    loginUser: function (req, res) {
        var useremailId = req.param('user_email');
        var userpwd = req.param('user_pwd');

        User.findOne({ where: { email: useremailId } }).exec(function (err, user) {
            if (user) {
                if (user.password != userpwd) {
                    res.serverError(err)
                }
                var token = passport.issueJWT(user);
                user.access_token = token.access_token;
                user.refresh_token = token.refresh_token;
                return res.json(user);
            }
            else {
                // message = "Email and Password invalid."
                // res.json(message);
                res.serverError(err)
            }

        });
    },
};

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
