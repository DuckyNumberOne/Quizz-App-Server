const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

let refreshTokes = [];

const authController = {
  accessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACESS_KEY,
      { expiresIn: "5hrs" }
    );
  },
  refreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1d" }
    );
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user != null) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (validPassword) {
          const accessToken = authController.accessToken(user);
          const refreshToken = authController.refreshToken(user);
          refreshTokes.push(refreshToken);

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
          const { password, ...userFilter } = user._doc;
          res.status(200).json({ userFilter, accessToken });
        } else {
          res.status(404).json("Wrong password");
        }
      } else {
        res.status(404).json("Wrong email ! ");
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticaed");
    if (!refreshTokes.includes(refreshToken))
      return res.status(403).json("Refresh token is not valid");
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokes = refreshTokes.filter((token) => token !== refreshToken);
      const newAccessToken = authController.accessToken(user);
      const newRefreshToken = authController.refreshToken(user);
      refreshTokes.push(newRefreshToken);
      res.cookie("refreshToke", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },
  logout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokes = refreshTokes.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logout success !");
  },
};
module.exports = authController;
