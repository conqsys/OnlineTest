
/**
 * email Service 
 * 
 * Use this method [ sails.hooks.email.send(template, data, options, cb) ] 
 * to send an email. 
 * @param  {Sting}    template (a named template to render)
 * @param  {Object}   data (data to pass into the template)
 * @param  {Object}   options (email options including to, from, etc)
 * @param  {Function} cb
 * 
 */

module.exports = {
    sendWelcomeMail: function(obj) {
        sails.hooks.email.send(
            'password', 
            {
                recipientName: "Joe",
                senderName: "Sue"
            },
            {
                to: "amit8774@gmail.com",
                subject: "SailsJS email test"
            },
            function(err) {
                console.log(err || 'Mail Sent!');
            }
        )
    }
}
