const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require("./keys");

const accessTokenStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }
);

const refreshTokenStrategy = new JwtStrategy(
  {
    jwtFromRequest: (req) => req.cookies.refresh_token,
    secretOrKey: JWT_REFRESH_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }
);

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Incorrent username or password" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrent username or password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

passport.use("jwtAccess", accessTokenStrategy);
passport.use("jwtRefresh", refreshTokenStrategy);
passport.use("localAccess", localStrategy);
