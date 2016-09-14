var passport = require('passport-strategy')
    , auth_hdr = require('./auth_header')
    , util = require('util')
    , url = require('url')
    , jwt=  require('jsonwebtoken');



/**
 * Strategy constructor
 *
 * @param options
 *          secretOrKey: (REQUIRED) String or buffer containing the secret or PEM-encoded public key
 *          jwtFromRequest: (REQUIRED) Function that accepts a reqeust as the only parameter and returns the either JWT as a string or null
 *          issuer: If defined issuer will be verified against this value
 *          audience: If defined audience will be verified against this value
 *          algorithms: List of strings with the names of the allowed algorithms. For instance, ["HS256", "HS384"].
 *          ignoreExpiration: if true do not validate the expiration of the token.
 *          passReqToCallback: If true the, the verify callback will be called with args (request, jwt_payload, done_callback).
 * @param verify - Verify callback with args (jwt_payload, done_callback) if passReqToCallback is false,
 *                 (request, jwt_payload, done_callback) if true.
 */
function JwtStrategy(options, verify) {

    passport.Strategy.call(this);
    this.name = 'jwt';
    this._options=options;

    this._secretOrKey = options.secretOrKey;
    if (!this._secretOrKey) {
        throw new TypeError('JwtStrategy requires a secret or key');
    }

    this._verify = verify;
    if (!this._verify) {
        throw new TypeError('JwtStrategy requires a verify callback');
    }

    this._jwtFromRequest = options.jwtFromRequest;
    if (!this._jwtFromRequest) {
        throw new TypeError('JwtStrategy requires a function to retrieve jwt from requests (see option jwtFromRequest)');
    }

    this._passReqToCallback = options.passReqToCallback;
    this._verifOpts = {};

    if (options.issuer) {
        this._verifOpts.issuer = options.issuer;
    }

    if (options.audience) {
        this._verifOpts.audience = options.audience;
    }

    // if (options.algorithms) {
    //     this._verifOpts.algorithms = options.algorithms;
    // }

    if (options.expiresIn) {
        this._verifOpts.expiresIn = options.expiresIn;
    }

    if (options.ignoreExpiration != null) {
        this._verifOpts.ignoreExpiration = options.ignoreExpiration;
    }

};
util.inherits(JwtStrategy, passport.Strategy);



/**
 * Allow for injection of JWT Verifier.
 *
 * This improves testability by allowing tests to cleanly isolate failures in the JWT Verification
 * process from failures in the passport related mechanics of authentication.
 *
 * Note that this should only be replaced in tests.
 */
JwtStrategy.JwtVerifier = require('./verify_jwt');



/**
 * Authenticate request based on JWT obtained from header or post body
 */
JwtStrategy.prototype.authenticate = function(req, options) {
    var self = this;

    var token = self._jwtFromRequest(req);


    if (!token) {
        return self.fail(new Error("No auth token"));
    }

    // Verify the JWT
    JwtStrategy.JwtVerifier(token, this._secretOrKey, this._verifOpts, function(jwt_err, payload) {
        console.log("error "+jwt_err)
        
        if (jwt_err) {
            return self.fail(jwt_err);
        } else {
            // Pass the parsed token to the user
            var verified = function(err, user, info) {
                if(err) {
                    return self.error(err);
                } else if (!user) {
                    return self.fail(info);
                } else {
                    console.log(JSON.stringify(user));
                    return self.success(user, info);
                }
            };

            try {
                if (self._passReqToCallback) {
                    self._verify(req, payload, verified);
                } else {
                    self._verify(payload, verified);
                }
            } catch(ex) {
                self.error(ex);
            }
        }
    });
};

JwtStrategy.prototype.sign=function(user,req)
{
    var self=this;
    if(self._verifOpts.algorithms) {
      delete self._verifOpts.algorithms;
    }
    //var refresh_token=self.getRefreshToken(user,req.headers.origin,req.param('client_id'))
     var refresh_token=self.getRefreshToken(user)
    var token=jwt.sign(user,self._secretOrKey,self._verifOpts)
      var grant={
        access_token:token,
        refresh_token:refresh_token
      }

      return grant;
}

JwtStrategy.prototype.getRefreshToken=function(user,origin,client_id)
{      
    var token=jwt.sign(user.id+'-'+new Date().getTime(),this._secretOrKey,{})
    return token;
}

JwtStrategy.prototype.verifyRefreshToken=function(refresh_token)
{
  JwtStrategy.JwtVerifier(refresh_token, this._secretOrKey, {}, function(jwt_err, payload) {
     if (!jwt_err) {
        return payload;
     }
  })
}

JwtStrategy.prototype.pipe=function(req,res,next) 
{
  var self = this;
  var token = self._jwtFromRequest(req);

  if(token) {
   JwtStrategy.JwtVerifier(token, self._secretOrKey, self._verifOpts, function(jwt_err, payload) {
      console.log("error "+jwt_err)
      
      if (jwt_err) {
        req.isAuthenticated=false;  
      } 
      else {
        req.user=payload;
        req.isAuthenticated=true;
      }
      next(); 
    });
   } else {
    next(); 
   }




   
}

/**
 * Export the Jwt Strategy
 */
 module.exports = JwtStrategy;
