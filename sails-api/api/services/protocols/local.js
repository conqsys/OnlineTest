var validator = require('validator');

/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate users is via a username
 * and/or email as well as a password. This module provides functions both for
 * registering entirely new users, assigning passwords to already registered
 * users and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

/**
 * Register a new user
 *
 * This method creates a new user from a specified email, username and password
 * and assign the newly created user a local Passport.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.register = function (req, res, next) {
  var email    = req.param('email')
    , username = req.param('username')
    , password = req.param('password')
		, location = req.param('location')
		, birthday = req.param('birthday')
		, agreedToTerms = req.param('agreedToTerms');
	
	sails.log.info("register user with url:"+req.originalUrl);
  sails.log.info("with params:");
	for (key in req.params) {
  	sails.log.info(key + ": " + req.params[key]);
  }
  var flashErrors=[];
	if (!email) {
    flashErrors.push({error:'Error.Passport.Email.Missing'})        
  }

  if (!username) {
    //req.flash('error', 'Error.Passport.Username.Missing');
    //return next(new Error('No username was entered.'));
    flashErrors.push({error:'No username was entered'})    
  }

  if (!password) {
    //req.flash('error', 'Error.Passport.Password.Missing');
    //return next(new Error('No password was entered.'));
    flashErrors.push({error:'No password was entered'})    
  }
	if (!location) {
		location = User.defaultLocation;
	}
  if(flashErrors.length>0) {
    return next(flashErrors);
  }
	else {
		// merge with defaults
		
		var locationParams = req.param('location');
		location = User.defaultLocation;
		
		for (var locationField in locationParams) {
			if (location.hasOwnProperty(locationField) && typeof locationParams[locationField] ==='string') {
				location[locationField] = locationParams[locationField];
				sails.log.info("setting user.location." + locationField +" to "+locationParams[locationField]);
			} else {
				sails.log.warn("not setting field " + locationField +" of user location");
			}
				
		}
		
	}
  User.create({
    username : username
  , email    : email
	, location : location
	, birthday : birthday
	, agreedToTerms: agreedToTerms
		
  }, function (err, user) {
    if (err) {
      if (err.code === 'E_VALIDATION') {
        if (err.invalidAttributes.email) {
          req.flash('error', 'Error.Passport.Email.Exists');

        } else {
          req.flash('error', 'Error.Passport.User.Exists');
        }
      }
      
      return next(err);
    }

    Passport.create({
      protocol : 'local'
    , password : password
    , user     : user.id
			
    }, function (err, passport) {
      if (err) {
        if (err.code === 'E_VALIDATION') {
          req.flash('error', 'Error.Passport.Password.Invalid');
        }
        
        return user.destroy(function (destroyErr) {
          next(destroyErr || err);
        });
      }

      next(null, user);
    });
  });
};

/**
 * Assign local Passport to user
 *
 * This function can be used to assign a local Passport to a user who doens't
 * have one already. This would be the case if the user registered using a
 * third-party service and therefore never set a password.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.connect = function (req, res, next) {
  var user     = req.user
    , password = req.param('password');

  Passport.findOne({
    protocol : 'local'
  , user     : user.id
  }, function (err, passport) {
    if (err) {
      return next(err);
    }

    if (!passport) {
      Passport.create({
        protocol : 'local'
      , password : password
      , user     : user.id
      }, function (err, passport) {
        next(err, user);
      });
    }
    else {
      next(null, user);
    }
  });
};

/**
 * Validate a login request
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 *
 * @param {Object}   req
 * @param {string}   identifier
 * @param {string}   password
 * @param {Function} next
 */
exports.login = function (req, identifier, password, next) {
  var isEmail = validator.isEmail(identifier)
    , query   = {};

  if (isEmail) {
    query.email = identifier;
  }
  else {
    query.username = identifier;
  }

  User.findOne(query, function (err, user) {
    if (err) {
      return next(err);
    }
    var flashErrors=[];

    if (!user) {
      if (isEmail) {
        req.flash('error', 'Error.Passport.Email.NotFound');
        flashErrors.push({error:'Incorrect email id or password'})
      } else {
        flashErrors.push({error:'Incorrect username or password'})
        req.flash('error', 'Error.Passport.Username.NotFound');
      }

      return next(flashErrors, false);
    }

    Passport.findOne({
      protocol : 'local'
    , user     : user.id
    }, function (err, passport) {
      if (passport) {
        passport.validatePassword(password, function (err, res) {
          if (err) {
            return next(err);
          }

          if (!res) {
            flashErrors.push({error:'Incorrect username id or password'})
            req.flash('error', 'Error.Passport.Password.Wrong');
            return next(flashErrors, false);
          } else {
            return next(null, user);
          }
        });
      }
      else {
        req.flash('error', 'Error.Passport.Password.NotSet');
        flashErrors.push({error:'Incorrect username id or password'})
        return next(flashErrors, false);
      }
    });
  });
};
