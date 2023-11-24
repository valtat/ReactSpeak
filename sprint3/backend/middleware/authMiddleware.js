const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/keys");
const passport = require("passport");

const userAuth = (req, res, next) => {
  if (req.user && (req.user.role === "user" || req.user.role === "admin")) {
    next();
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

function jwtAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.user = user;
    next();
  })(req, res, next);
}

function refreshAuth(req, res, next) {
  passport.authenticate(
    "refreshToken",
    { session: false },
    (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
}

const localAuth = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  })(req, res, next);
};

const userAuthOld = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "user" || decodedToken.role !== "admin") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

const adminAuthOld = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "admin") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

module.exports = { userAuth, adminAuth, localAuth, jwtAuth, refreshAuth };
