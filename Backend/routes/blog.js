const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogbyId,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogsByUser,
  displayLikes,
  toggleLikes,
  getComments,
  addComment,
} = require("../controllers/blog");

const upload = require("../middlewares/multer");

const verifyAuth = require("../middlewares/auth");

router.get("/blogs", getAllBlogs);

router.post("/blogs", verifyAuth, upload.single("image"), createBlog);

router.get("/blogs/:slug", getBlogbyId);

router.delete("/blogs/:id", deleteBlog);

router.put("/blogs/:id", updateBlog);

router.get("/blogs/user/:userId", getBlogsByUser);

router.get("/blogs/:id/likes", displayLikes);

router.post("/blogs/:id/likes", toggleLikes);

router.get("/blogs/:id/comments", getComments);

router.post("/blogs/:id/comments", addComment);

module.exports = router;
