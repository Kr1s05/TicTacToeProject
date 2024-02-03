const router = require("express").Router();
const { passport, checkAuthenticated, register } = require("../authentication");

router.post(
  "/login",
  (req, res, next) => {
    if (req.body.email) req.body.username = req.body.email;
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "/unauthorized",
    successRedirect: "/user",
  })
);

router.get("/unauthorized", (req, res) => {
  res.json({ message: "Unauthorized" });
});

router.get("/user", checkAuthenticated, (req, res) => {
  res.json(req.user);
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send();
  });
});

router.post(
  "/register",
  register,
  passport.authenticate("local"),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
