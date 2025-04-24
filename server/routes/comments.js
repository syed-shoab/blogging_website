const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.post("/", async (req, res) => {
  const { postId, author, content } = req.body;
  const comment = new Comment({ postId, author, content });
  await comment.save();
  res.json({ message: "Comment added" });
});

router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId });
  res.json(comments);
});

module.exports = router;
