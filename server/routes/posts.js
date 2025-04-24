const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const router = express.Router();

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.username;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
}

router.get("/", async (req, res) => {
  const query = req.query.q;
  let posts;
  if (query) {
    posts = await Post.find({ content: { $regex: query, $options: "i" } }).sort({ createdAt: -1 });
  } else {
    posts = await Post.find().sort({ createdAt: -1 });
  }
  res.json(posts);
});

router.post("/", authenticate, async (req, res) => {
  const newPost = new Post({ author: req.user, content: req.body.content });
  await newPost.save();
  res.json(newPost);
});

router.post("/:id/comment", authenticate, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.user, text: req.body.text });
  await post.save();
  res.json(post);
});

module.exports = router;
