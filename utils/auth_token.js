var AuthToken = require('../models/AuthToken');
var request = require("request");

const AUDIENCE = "https://librarieswithoutborders.auth0.com/api/v2/",
  DOMAIN = process.env.AUTH0_MANAGEMENT_DOMAIN
  CLIENT_ID = process.env.AUTH0_MANAGEMENT_CLIENT_ID
  CLIENT_SECRET = process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
  GRANT_TYPE = "client_credentials"

const currTime = new Date()

exports.getToken = function() {
  return new Promise(function(resolve, reject) {
    AuthToken.find({}).exec((err, data) => {
      if (err) { return err }
      console.log(data.length)

      if (data && data.length > 0) {
        if (isTokenValid(data[0])) {
          console.log("token is valid")
          resolve(data[0])
          return;
        }
      }

      getNewToken(resolve, reject);
    })
  })
};

const isTokenValid = function(token) {
  console.log("checking token valid")
  if (token && token.expires_in) {
    console.log(token.createdAt.getTime()/1000 + token.expires_in)
    console.log(currTime.getTime()/1000)
    if (token.createdAt.getTime()/1000 + token.expires_in > currTime.getTime()/1000) {
      return true;
    }
  }

  return false
}

const getNewToken = function(resolve, reject) {
  console.log("getting new token")

  var options = {
    method: 'POST',
    url: DOMAIN,
    headers: { 'content-type': 'application/json' },
    body:
     { grant_type: GRANT_TYPE,
       client_id: CLIENT_ID,
       client_secret: CLIENT_SECRET,
       audience: AUDIENCE },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body)
    if (body) {

      AuthToken.remove().exec(() => {
        AuthToken.create(body, (err, data) => {
          if (err) { return err }

          return data;
          resolve(body)
        })
      })
    }
  });
};
