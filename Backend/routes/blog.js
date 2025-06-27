const express = require("express");
const router = express.Router();
const { getAllBlogs, getBlogbyId, createBlog } = require("../controllers/blog");

router.get("/blogs", getAllBlogs);

router.post("/blogs", createBlog);

router.get("/blogs/:slug", getBlogbyId);

//router.delete("/blogs/:id");

// router.put("/blogs/:id");

// router.get("/blogs/user/:userId");

// router.get("/blogs/:id/likes");

module.exports = router;
