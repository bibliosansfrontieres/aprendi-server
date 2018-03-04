const { getToken } = require('./auth_token')
var request = require("request");

exports.getUsersFromAuth0 = function(teamId) {
  return new Promise(function(resolve, reject) {
    console.log(teamId)
    getToken().then(token => {
      console.log("got token")

      var options = { method: 'GET',
        url: 'https://librarieswithoutborders.auth0.com/api/v2/users',
        headers:
         { authorization: 'Bearer ' + token.access_token,
           'content-type': 'application/json' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        resolve(body)
      });
    });
  })
}
