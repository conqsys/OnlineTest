module.exports = (req, res) => {
  var generator = {};

  // generator.checkAppClient = () => {
  //   return new Promise((resolve, reject) => {
  //     /* if request coming from oAuth*/
  //     if (req.param('code')) {
  //       return resolve();
  //     }

  //     App_Client.findOne({
  //       client_id: req.param('client_id'),
  //     }, (error, client) => {
  //       if (error) {
  //         reject(error);
  //       } else if (!client) {
  //         reject(new Error('Invalid client id'));
  //       } else if (client.is_native_client===true && client.client_secret !== req.param('client_secret')) {
  //         reject(new Error('Invalid client id or secret'));
  //       } else if (client.is_native_client===false && client.allowed_origin !== req.headers.origin) {
  //         reject(new Error('Origin not allowed'));
  //       } else {
  //         resolve();
  //       }
  //     });
  //   });
  // };

  generator.issueToken = (user) => {
    return Administrator.findOne({ user: user.id })
      .then(function (admin) {
        if (!admin) {
          user.admin = false;
        } else {
          user.admin = true;
        }

        user.addEmailInJSON = true;
        var token = passport.issueJWT(user, req);
        user.access_token = token.access_token;
        user.refresh_token = token.refresh_token;

        return user;
      });
  };

  // generator.updateRefreshToken = (userToken) => {
  //   return Refresh_Token.update({
  //     where: {
  //       tokenValue: req.param('refresh_token'),
  //     },
  //   }, {
  //     tokenValue: userToken.refresh_token,
  //   }).then((affectedRows) => {
  //     if (affectedRows.length === 0) {
  //       throw new Error('Invalid refresh token');
  //     }

  //     return {
  //       access_token: userToken.access_token,
  //       refresh_token: userToken.refresh_token,
  //     };
  //   });
  // };

  // generator.insertRefreshToken = (userToken) => {
  //   return Refresh_Token.create({
  //     userId: userToken.id,
  //     tokenValue: userToken.refresh_token,
  //   });
  // };

  // generator.issueAccessToken = (user) => {
  //   var promises = [];

  //   if (req.param('action') === 'register') {
  //     sails.log.info('registered user:' + JSON.stringify(user));
  //     promises.push(AccountService.sendActivationEmail(user, req.baseUrl));
  //   }
  //   if (User.isBlocked(user)) {
  //     throw new Error('Account blocked');
  //     // return res.json({ error: "account blocked" }, 400);
  //   }
  //   if (user.exp) {
  //     delete user.exp;
  //   }    
  //   return Promise.all(promises)
  //     .then(() => {
  //       return generator.issueToken(user);
  //     })
  //     .then((userToken) => {        
  //       return generator.insertRefreshToken(userToken),userToken;
  //     }).then((userToken)=> {
  //       return userToken;
  //     });
  // };

  // generator.issueTokenThroughPassport = () => {
  //   return new Promise((resolve, reject) => {
  //     passport.callback(req, res, function (err, user) {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(user);
  //       }
  //     });
  //   })
  //   .then((user) => {
  //     return generator.issueAccessToken(user);
  //   });
  // };

  return generator;
};
