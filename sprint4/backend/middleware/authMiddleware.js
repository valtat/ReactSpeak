const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/keys");
const passport = require("passport");

const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    const error = new Error("Not authorized as an admin");
    error.status(401);
    next(error);
  }
};

const jwtAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      console.log("JWT auth failed, returning 401");
      return res.status(401).json({ message: info.message });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const authJwtAccess = (req, res, next) => {
  passport.authenticate(
    "jwtAccess",
    { session: false },
    (error, user, info) => {
      if (error) return next(error);
      if (!user) {
        const err = new Error(info.message);
        err.statusCode = 401;
        return next(err);
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

const authJwtRefresh = (req, res, next) => {
  passport.authenticate(
    "jwtRefresh",
    { session: false },
    (error, user, info) => {
      if (error) return next(error);
      if (!user) {
        const err = new Error(info.message);
        err.statusCode = 401;
        return next(err);
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

const localAuthNew = (req, res, next) => {
  passport.authenticate(
    "localAccess",
    { session: false },
    (error, user, info) => {
      if (error) return next(error);

      if (!user) {
        const err = new Error(info.message);
        err.statusCode = 401;
        return next(err);
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

const refreshAuth = (req, res, next) => {
  passport.authenticate(
    "refreshToken",
    { session: false },
    (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        console.log("Refresh auth failed, returning 401");
        return res.status(401).json({ message: info.message });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

const localAuth = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({ message: "Authentication failed" });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  })(req, res, next);
};

module.exports = {
  adminAuth,
  localAuth,
  jwtAuth,
  refreshAuth,
  authJwtAccess,
  authJwtRefresh,
  localAuthNew,
};
