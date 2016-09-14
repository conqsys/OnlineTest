var path     = require('path')
  , url      = require('url')
  , passport = require('passport')
  , async		 = require('async');

/**
 * Passport Service
 *
 * A painless Passport.js service for your Sails app that is guaranteed to
 * Rock Your Socks™. It takes all the hassle out of setting up Passport.js by
 * encapsulating all the boring stuff in two functions:
 *
 *   passport.endpoint()
 *   passport.callback()
 *
 * The former sets up an endpoint (/auth/:provider) for redirecting a user to a
 * third-party provider for authentication, while the latter sets up a callback
 * endpoint (/auth/:provider/callback) for receiving the response from the
 * third-party provider. All you have to do is define in the configuration which
 * third-party providers you'd like to support. It's that easy!
 *
 * Behind the scenes, the service stores all the data it needs within "Pass-
 * ports". These contain all the information required to associate a local user
 * with a profile from a third-party provider. This even holds true for the good
 * ol' password authentication scheme – the Authentication Service takes care of
 * encrypting passwords and storing them in Passports, allowing you to keep your
 * User model free of bloat.
 */

// Load authentication protocols
passport.protocols = require('./protocols');

/**
 * Connect a third-party profile to a local user
 *
 * This is where most of the magic happens when a user is authenticating with a
 * third-party provider. What it does, is the following:
 *
 *   1. Given a provider and an identifier, find a mathcing Passport.
 *   2. From here, the logic branches into two paths.
 *
 *     - A user is not currently logged in:
 *       1. If a Passport wassn't found, create a new user as well as a new
 *          Passport that will be assigned to the user.
 *       2. If a Passport was found, get the user associated with the passport.
 *
 *     - A user is currently logged in:
 *       1. If a Passport wasn't found, create a new Passport and associate it
 *          with the already logged in user (ie. "Connect")
 *       2. If a Passport was found, nothing needs to happen.
 *
 * As you can see, this function handles both "authentication" and "authori-
 * zation" at the same time. This is due to the fact that we pass in
 * `passReqToCallback: true` when loading the strategies, allowing us to look
 * for an existing session in the request and taking action based on that.
 *
 * For more information on auth(entication|rization) in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 * http://passportjs.org/guide/authorize/
 *
 * @param {Object}   req
 * @param {Object}   query
 * @param {Object}   profile
 * @param {Function} next
 */


/**
 * Create an authentication endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param  {Object} req
 * @param  {Object} res
 */
passport.endpoint = function (req, res) {
  var strategies = sails.config.passport
    , provider   = req.param('provider')
    , options    = {};
		sails.log.info("---passport end point");
  // If a provider doesn't exist for this endpoint, send the user back to the
  // login page
  if (!strategies.hasOwnProperty(provider)) {
    return res.redirect('/login');
  }

  // Attach scope if it has been set in the config
  if (strategies[provider].hasOwnProperty('scope')) {
    options.scope = strategies[provider].scope;
  }

  // Redirect the user to the provider for authentication. When complete,
  // the provider will redirect the user back to the application at
  //     /auth/:provider/callback
  this.authenticate(provider, options)(req, res, req.next);
};

/**
 * Create an authentication callback endpoint
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
passport.callback = function (req, res, next) {
  var provider = req.param('provider', 'local')
    , action   = req.param('action');

  // Passport.js wasn't really built for local user registration, but it's nice
  // having it tied into everything else.
  if (provider === 'local' && action !== undefined) {
    if (action === 'register' && !req.user) {
      this.protocols.local.register(req, res, next);
    }
    else if (action === 'connect' && req.user) {
      this.protocols.local.connect(req, res, next);
    }
    else {
      next(new Error('Invalid action'));
    }
  } else {

    // The provider will redirect the user to this URL after approval. Finish
    // the authentication process by attempting to obtain an access token. If
    // access was granted, the user will be logged in. Otherwise, authentication
    // has failed.
    this.authenticate(provider, next)(req, res, req.next);
  }
};

/**
 * Load all strategies defined in the Passport configuration
 *
 * For example, we could add this to our config to use the GitHub strategy
 * with permission to access a users email address (even if it's marked as
 * private) as well as permission to add and update a user's Gists:
 *
    github: {
      name: 'GitHub',
      protocol: 'oauth2',
      scope: [ 'user', 'gist' ]
      options: {
        clientID: 'CLIENT_ID',
        clientSecret: 'CLIENT_SECRET'
      }
    }
 *
 * For more information on the providers supported by Passport.js, check out:
 * http://passportjs.org/guide/providers/
 *
 */
passport.loadStrategies = function () {
  var self       = this
    , strategies = sails.config.passport;

  Object.keys(strategies).forEach(function (key) {

    var options = { passReqToCallback: true }, Strategy;

    if (key === 'local') {
      // Since we need to allow users to login using both usernames as well as
      // emails, we'll set the username field to something more generic.
      _.extend(options, { usernameField: 'identifier' });

      // Only load the local strategy if it's enabled in the config
      if (strategies.local) {
        Strategy = strategies[key].strategy;

        self.use(new Strategy(options, self.protocols.local.login));
      }
    } else {
      var protocol = strategies[key].protocol
        , callback = strategies[key].callback;

      if (!callback) {
        callback = path.join('auth', key, 'callback');
      }

      Strategy = strategies[key].strategy;
      
      var baseUrl = sails.getBaseurl();
      
      switch (protocol) {
        case 'oauth':
        case 'oauth2':
          options.callbackURL = url.resolve(baseUrl, callback);
          break;

        case 'openid':
          options.returnURL = url.resolve(baseUrl, callback);
          options.realm     = baseUrl;
          options.profile   = true;
          break;
      }      

      // Merge the default options with any options defined in the config. All
      // defaults can be overriden, but I don't see a reason why you'd want to
      // do that.
      _.extend(options, strategies[key].options);
				self.use(new Strategy(options, self.protocols[protocol]));
//			}
      
    }
  });
};

/* 	on oAuth Call back this function will be called from oAuth2 policy 
		if user is already registered with same identifier then return the token response
		else just return the access_token from the provider and on frontend user should see
		a registeration form and from there - register action of authController will be called
*/
passport.sendOAuthToken=function(req,query,profile,next) {
	var provider=query.provider || profile.provider ;
	Passport.findOne({identifier:query.identifier,provider:provider}).exec(function(err,passportFetched) {
		if(passportFetched) {
			req.isAlreadyoAuthUser=true;			
			passport.connectoAuthProfile(req,query,profile)
			.then(function(data) {								
				return next(null,data[0]);
			})
			.catch(function(error) {
				return next(error,null);
			});
		} else {
			req.isAlreadyoAuthUser=false;
			req.userProfile=profile;
			req.accessQuery=query;		
			next();
		}		
	})

	

}


passport.buildUser= function(req,query,profile,user) {
      /* when using twitter-token, 
    query.provider is set to 'twitter-token' while it should  just be 'twitter'. 
    Force them to be the same: */

    query.provider = profile.provider;

    sails.log.info("provider: " +  profile.provider);
    sails.log.info("profile: " + JSON.stringify(profile));

    /* If the profile object contains a list of emails, grab the first one and
     add it to the user.*/
    if (profile.hasOwnProperty('emails')) {
      user.email = profile.emails[0].value;
    }
    // If the profile object contains a username, add it to the user.
    if (profile.hasOwnProperty('username')) {
      sails.log.info("profile.hasOwnProperty('username'))"+ profile.username);
      user.username = profile.username;
    } 

    
    var extra = profile._json;
    if (extra) {

      if (typeof extra.location == 'string') {
        user.location = {city: extra.location};
      } 

      if (typeof extra.location == 'object') {
        if (typeof extra.location.name == 'string') {
          user.location = {city: extra.location.name};
        }       
      }

      if (extra.birthday) {
        
        var d = new Date(extra.birthday);
        if (d.toString() !== 'Invalid Date') {
          var s = d.toISOString();// '1970-01-01T00:00:00.000Z'
          user.birthday = s.substring( 0, s.indexOf( "T" ) ); // chop of the time zone
          sails.log.info("found birthday: " + user.birthday);
        } else {
          sails.log.info('found invalid birthday format: ' + extra.birthday);
        }
      }
    }
    
    /* override username given by profile */
    if (req.body.username) {  
      user.username = req.body.username;
    }

    /* override username given by profile */
    if (req.body.email) {   
      user.email = req.body.email;
    }

    /* override location given by profile */
    if (req.body.agreedToTerms) { 
      user.agreedToTerms = req.body.agreedToTerms;
    }

    /* override birthday given by profile */
    if (req.body.birthday) {    
      user.birthday = req.body.birthday;
    }

  }



passport.extractImage=function(profile) {
                      
    var remove_normal_from_url=function(url) {
      /* for twitter see: https://dev.twitter.com/overview/general/user-profile-images-and-banners */
      
      var n = url.lastIndexOf("_normal.");              
      if (n === -1 ) {
        return url;
      }           
      return url.substr(0, n)+url.substr(n+7);
    }
    
    if (profile.provider === 'facebook') {
      /* we're not getting a picture in facebook profile's, so set it manually
         see https://developers.facebook.com/docs/graph-api/reference/v2.2/user/picture
      */
      if (!profile.photos) {
        profile.photos = [];
      }
      profile.photos[0] = { 
        value: "http://graph.facebook.com/v2.2/"+profile.id+"/picture?type=large"
      };
      
      
    } else if (profile.provider === 'google') {             
      var jsonProfile = profile["_json"];
      if (jsonProfile) {
        if (!profile.photos) {
          profile.photos = [];
        }
        
        if (!profile.photos[0]) {
          profile.photos[0] = { 
            value: jsonProfile["picture"] 
          };
        } 
        if (typeof profile.photos[0].value === 'string'){
          var imageUrl = profile.photos[0].value;
          sails.log.info("google image: "+imageUrl);
          var pos = imageUrl.indexOf('?sz');
          if (pos !== -1) {
            /* the provider is giving us a url which ends in somthing line photo.jpg?sz=50' 
               chop of the sz=50, because we want the normal sized picture
            */
            imageUrl = imageUrl.substring(0, pos);
            profile.photos[0].value = imageUrl;
          }                   
        }
        
      }
    }
    else if (profile.provider ==='twitter') {
        if(profil.photos && profile.photos.length>0 && profil.photos[0].value) {
          profile.photos[0].value = remove_normal_from_url(profile.photos[0].value);
          sails.log.info('removed _normal from url: '+profile.photos[0].value);
        }
    }

    if (  profile.photos && 
                    profile.photos.length>0 && 
                    profile.photos[0].value
                  ) {

        profile.hasPhoto=true;
    } else {
      profile.hasPhoto=false;
    }

}
  


passport.issueJWT=function(payload,req)
{	
	var jwtStrategy=passport._strategies.jwt;
	var token=jwtStrategy.sign(payload,req);
	return token;
}

passport.serializeUser(function (user, next) {
  next(null, user.id);
});

passport.deserializeUser(function (id, next) {
  User.findOne(id, next);
});

module.exports = passport;
