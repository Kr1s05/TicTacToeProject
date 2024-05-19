import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "@/models/User";
import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({
      attributes: ["username", "email", "password", "isActive"],
      where: {
        [Op.or]: [{ username: username }, { email: username }],
      },
    })
      .then((user) => {
        if (!user) return false;
        if (!user.isActive) return false;
        return bcrypt.compare(password, user.password).then(function (result) {
          const { username, email } = user;
          return result ? { username, email } : false;
        });
      })
      .then((user) => {
        return done(null, user);
      })
      .catch((error) => {
        return done(error);
      });
  })
);

passport.serializeUser((userObj, done) => {
  done(null, userObj);
});

passport.deserializeUser((userObj: User, done) => {
  done(null, userObj);
});

function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ message: "Unauthorized" });
}

async function register(req: Request, res: Response, next: NextFunction) {
  const { username, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  if (!password || password.length < 4 || password.length > 16) {
    return res
      .status(400)
      .json({ message: "password should be 4-16 characters long" });
  }
  User.create({
    username,
    email,
    password: passwordHash,
  })
    .then(() => {
      return next();
    })
    .catch((error) => {
      console.log(error["errors"][0]["path"]);
      return res.json({
        error: error["errors"][0]["message"],
        path: error["errors"][0]["path"],
      });
    });
}

export { passport, checkAuthenticated, register };
