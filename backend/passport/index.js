const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const helper = require("../utils/helper");

//requiring users model
const Users = require("../models/users");

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "user",
  new JWTStrategy(opts, async (payload, done) => {
    try {
      // Token only contains ID — so only check ID
      if (!payload.id) return done(null, false);

      //find by id method of mongoose
      const user = await Users.findById(payload.id).select("name email number");

      if (!user) return done(null, false);

      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(null, false);
    }
  })
);

module.exports = {
  initialize: () => passport.initialize(),

  authenticateUser: (req, res, next) => {
    return passport.authenticate(
      "user",
      { session: false },
      (err, user, info) => {
        if (err) return helper.error(res, "Something went wrong", err, 401);

        if (info?.name === "JsonWebTokenError")
          return helper.error(res, "Invalid Token", {}, 401);

        if (!user) return helper.error(res, "Invalid Token", {}, 401);

        req.user = user; // Attach user to request
        next();
      }
    )(req, res, next);
  },
};
