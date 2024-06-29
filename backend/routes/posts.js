const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/postControllers");

// Routes without any JWT token verification
router.get("/", postControllers.getPosts);
router.post("/", postControllers.createPost);
router.get("/:id", postControllers.getPost);
router.patch("/:id", postControllers.updatePost);
router.delete("/:id", postControllers.deletePost);
router.post("/like/:id", postControllers.likePost);
router.delete("/like/:id", postControllers.unlikePost);
router.get("/liked/:id", postControllers.getUserLikedPosts);
router.get("/like/:postId/users", postControllers.getUserLikes);

module.exports = router;
