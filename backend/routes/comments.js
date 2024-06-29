const express = require("express");
const router = express.Router();
const commentControllers = require("../controllers/commentControllers");

// Routes without JWT token verification
router.patch("/:id", commentControllers.updateComment);
router.post("/:id", commentControllers.createComment);
router.delete("/:id", commentControllers.deleteComment);
router.get("/post/:id", commentControllers.getPostComments);
router.get("/user/:id", commentControllers.getUserComments);

module.exports = router;
