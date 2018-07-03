const jwtToken = require('../lib/auth');

exports.verifyJWT_MW = function(req, res, next)
{
  let token = req.headers['x-request-id'];
  jwtToken.verifyJWTToken(token)
    .then((decodedToken) =>
    {
      req.user = decodedToken;
      next();
    })
    .catch((err) =>
    {
      res.send({message: "Invalid auth token provided."})
    })
}