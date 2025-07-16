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
  getBlogBySlug,
} = require("../controllers/blog");

const upload = require("../middlewares/multer");
const verifyAuth = require("../middlewares/auth");


router.get("/blogs/slug/:slug", getBlogBySlug);
router.get("/blogs", getAllBlogs);
router.post("/blogs", verifyAuth, upload.single("image"), createBlog);
console.log(1);
router.get("/blogs/user/:userId", getBlogsByUser);
// router.post("/blogs", verifyAuth, upload.single("image"), createBlog);
router.get("/blogs/likes/:id", displayLikes);

router.post("/blogs/likes/:id", toggleLikes);

router.get("/blogs/comments/:id", getComments);

router.post("/blogs/comments/:id", addComment);

router.get("/blogs/id/:id", getBlogbyId);

router.delete("/blogs/id/:id", deleteBlog);

router.put("/blogs/id/:id", verifyAuth, upload.single("image"), updateBlog);

module.exports = router;
