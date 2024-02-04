import { Router } from "express";
import {
  checkAuthenticated,
  passport,
  register,
} from "@/authentication/passportConfig";
import { getIo } from "@/socket/socket";

export const router = Router();
router.post(
  "/login",
  (req, _res, next) => {
    if (req.body.email) req.body.username = req.body.email;
    next();
  },
  passport.authenticate("local", {
    failureRedirect: "/unauthorized",
    successRedirect: "/user",
  })
);

router.get("/unauthorized", (_req, res) => {
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
    const sessionId = req.session.id;
    req.session.destroy(() => {
      // disconnect all Socket.IO connections linked to this session ID
      getIo().to(`session:${sessionId}`).disconnectSockets();
      res.status(204).end();
    });
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
