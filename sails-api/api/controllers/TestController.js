/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    hi: function (req, res) {
        
        var user=
        {
            name:"ankit",
            age:26
        }
        
        return res.send(user);
    },
    bye: function (req, res) {
        return res.redirect('http://www.sayonara.com');
    }
};

