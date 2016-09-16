/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getUser: function (req, res) {
        User.find().exec(function (err, user) {
            if (err) return res.serverError(err);
            else return res.json(user);
        })
    },
    addUser: function (req, res) {
        // var userVal = (req.body.value) ? req.body.value : undefined
        var str = "CALL spSaveUser(" + req.body.user_id + ",'" + req.body.user_name + "'," + req.body.user_email + "," + req.body.user_mobile_no + ",'" + req.body.user_address + "',"
            + req.body.user_pwd + ",'" + req.body.is_active + "','" + req.body.is_fresher + "','" + req.body.user_exp_month + "','"
            + req.body.user_exp_year + ",'" + req.body.role_id + ",'" + req.body.created_by + ",'" + req.body.updated_by + "')";
        Question.query(str, function (err, result) {
            if (err) return res.serverError(err);
            else {
                if (req.body.user_id != 0) {
                    req.body.options.forEach(function (option) {
                        var str = "CALL spSaveCompanyuser(" + 0 + ",'" + req.body.company_id + "," + req.body.user_id + ")";
                        CompanyUser.query(str, function (err, result) {
                        })
                    });
                    return res.json(result);
                }
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

