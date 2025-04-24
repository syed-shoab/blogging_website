const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  author: String,
  content: String,
  comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
