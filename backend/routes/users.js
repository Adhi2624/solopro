const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

// User routes
router.get("/random", userControllers.getRandomUsers);
router.get("/:username", userControllers.getUser);
router.post("/follow/:id", userControllers.follow);
router.delete("/unfollow/:id", userControllers.unfollow);
router.get("/followers/:id", userControllers.getFollowers);
router.get("/following/:id", userControllers.getFollowing);

module.exports = router;
