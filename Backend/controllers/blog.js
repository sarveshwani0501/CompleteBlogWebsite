const Blog = require("../models/blog");
const User = require("../models/user");

async function getAllBlogs(req, res) {
  try {
    const body = req.body;
    const allBlogs = await Blog.find({});
    return res.status(200).json({ msg: "Blog request success", allBlogs });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function getBlogbyId(req, res) {
  try {
    const body = req.body;
    const slug = req.params.slug;
    const blog = await Blog.findOne({ slug: slug });

    if (!blog) {
      return res.status(300).json({ msg: "Blog unavailable" });
    }
    return res.status(200).json({
      msg: "Blog request success",
      blog: blog,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

module.exports = {
  getAllBlogs,
  getBlogbyId,
};
