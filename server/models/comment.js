const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  author: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
