const Blog = require("../models/blog");
const User = require("../models/user");
const slugify = require("slugify");
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
    const slugId = req.params.slug;
    const blog = await Blog.findOne({ slug: slugId });

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
    //
    const singleBlog = {};
    singleBlog.author = author;
    singleBlog.title = blogTitle;
    singleBlog.body = blogBody;

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

async function deleteBlog(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "No User id provided" });
    }

    await Blog.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateBlog(req, res) {
  try {
    const updates = req.body;
    const id = req.params.id;
    console.log(updates);
    if (updates.title) {
      updates.slug = slugify(updates.title, { lower: true, strict: true });
    }
    console.log(updates);
    const updatedBlog = await Blog.findByIdAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(400).json({ msg: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getBlogsByUser(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "UserId not present" });
    }
    const allBlogs = await Blog.find({ author: userId });

    return res.status(200).json(allBlogs);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function displayLikes(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Blog id missing" });
    }

    const blog = await Blog.findById(id);

    const likes = blog.likes;

    return res.status(200).json({ likes });
  } catch (error) {
    return res.status(500).json({ error });
  }
}




module.exports = {
  getAllBlogs,
  getBlogbyId,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogsByUser,
  displayLikes,
};
