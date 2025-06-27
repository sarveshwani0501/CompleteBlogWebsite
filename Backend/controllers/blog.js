const Blog = require("../models/blog");
const User = require("../models/user");
const slug = require("slug");
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

async function createBlog(req, res) {
  try {
    const { author, blogTitle, blogBody, tags, coverImage } = req.body;
    if (!author) {
      return res.status(400).json({ error: "User not logged in" });
    }
    if (!blogTitle || !blogBody) {
      return res.status(400).json({ error: "Required fields not filled" });
    }
    const slugId = slug(blogTitle);
    //
    const singleBlog = {};
    singleBlog.author = author;
    singleBlog.title = blogTitle;
    singleBlog.body = blogBody;
    singleBlog.slug = slugId;

    if (coverImage) {
      singleBlog.coverImage = coverImage;
    }
    if (tags) {
      singleBlog.tags = tags;
    }
    //
    const blog = await Blog.create(singleBlog);

    return res.status(201).json({ msg: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  getAllBlogs,
  getBlogbyId,
  createBlog,
};
