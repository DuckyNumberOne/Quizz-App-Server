const jwt = require('jsonwebtoken');

const middlewareToken = {
  verifyTokenMember: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(' ')[1];
      try {
        jwt.verify(accessToken, process.env.JWT_ACESS_KEY, (err, user) => {
          if (err) {
            return res.status(403).json('Token is not valid');
          }
          req.user = user;
          next();
        });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(401).json("You're not authenticated");
    }
  },
  verifyTokenAdmin: (req, res, next) => {
    middlewareToken.verifyTokenMember(req, res, () => {
      if (req.user.admin) {
        next();
      } else {
        res.status(403).json('you are not Admin');
      }
    });
  },
};

module.exports = middlewareToken;
