const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const cookieExtractor = function (req, cookieName) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[cookieName];
  }
  return token;
};

const opts = {
  jwtFromRequest: (req) => cookieExtractor(req, "access_token"),
  secretOrKey: process.env.JWT_SECRET,
};

const refreshOpts = {
  jwtFromRequest: (req) => cookieExtractor(req, "refresh_token"),
  secretOrKey: process.env.JWT_REFRESH_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false, { message: "Invalid access token" });
      } catch (err) {
        return done(err, false);
      }
    })
  );

  passport.use(
    "refreshToken",
    new JwtStrategy(refreshOpts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false, { message: "Invalid refresh token" });
      } catch (err) {
        return done(err, false);
      }
    })
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        console.log(email, password);
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: "No user with that username" });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Password incorrect" });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
