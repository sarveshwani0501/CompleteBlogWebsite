const Blog = require("../models/blog");
const User = require("../models/user");
const slugify = require("slugify");
const uploadToCloudinary = require("../utils/cloudinary");

async function getAllBlogs(req, res) {
  try {
    const { tags } = req.query;
    const tagList = tags ? tags.split(",") : [];
    if (tagList.length == 0) {
      const blogs = await Blog.find({}).populate("author");
      return res.status(200).json({ msg: "Blog request success", blogs });
    }
    const allBlogs = await Blog.find({ tags: { $in: tagList } }).populate(
      "author"
    );

    return res
      .status(200)
      .json({ msg: "Blog request success", blogs: allBlogs });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function getBlogbyId(req, res) {
  try {
    //const body = req.body;
    const id = req.params.id;
    console.log(id);
    const blog = await Blog.findOne({ _id: id })
      .populate("comments.commentor")
      .populate("author");

    if (!blog) {
      return res.status(404).json({ msg: "Blog unavailable" });
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
    const { author, blogTitle, blogBody } = req.body;
    const tags = req.body.tags
      ? req.body.tags.split(",").map((tag) => tag.trim())
      : [];

    const localPath = req.file?.path;

    const result = await uploadToCloudinary(localPath, "blog-covers");
    if (!result) return res.status(400).json({ msg: "Image upload failed" });

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

    if (localPath) {
      singleBlog.coverImage = result.secure_url;
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
    const blog = await Blog.findById(id);
    await Blog.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Blog deleted successfully", blog });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getBlogBySlug(req, res) {
  try {
    console.log(123);
    const { slug } = req.params;
    console.log("Blog", slug);
    const blog = await Blog.findOne({ slug: slug }).populate(
      "comments.commentor"
    );
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    return res.status(200).json({ msg: "Blog Success", blog });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateBlog(req, res) {
  try {
    const updates = req.body;
    const id = req.params.id;
    console.log("Update blog: ", updates);
    if (updates.blogTitle) {
      updates.slug = slugify(updates.blogTitle, { lower: true, strict: true });
    }
    console.log(updates);
    console.log(id);
    const tags = updates.tags
      ? updates.tags.split(",").map((tag) => tag.trim())
      : [];
    const localPath = req?.file?.path;
    let result;
    if (localPath) {
      result = await uploadToCloudinary(localPath, "blog-covers");
      if (!result) return res.status(400).json({ msg: "Image upload failed" });
    }
    // console.log(39534455);
    const blog = await Blog.findById(id);
    if (updates.blogBody) {
      blog.body = updates.blogBody;
    }
    //console.log(39534455);
    if (localPath) {
      blog.coverImage = result.secure_url;
    }
    //console.log(39534455);
    if (updates.blogTitle) {
      blog.title = updates.blogTitle;
      blog.slug = updates.slug;
    }
    if (tags) {
      blog.tags = tags;
    }
    //console.log(39534455);
    await blog.save();

    if (!blog) {
      return res.status(400).json({ msg: "Blog not found" });
    }
    //console.log(39534455);
    return res.status(200).json({ msg: "Blog updated successfully", blog });
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

    return res.status(200).json({ msg: "User Blogs Sent", allBlogs });
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

async function toggleLikes(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(123);
    if (!id) {
      return res.status(400).json({ error: "Blog id missing" });
    }
    console.log(321);
    if (!userId) {
      return res.status(400).json({ error: "User not logged in" });
    }
    console.log("rgvre");
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(400).json({ error: "Blog does not exist" });
    }
    const hasLiked = blog.likes.includes(userId);
    if (hasLiked) {
      blog.likes.pull(userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    return res.status(200).json({
      msg: hasLiked ? "Unliked" : "Liked",
      blog: blog,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getComments(req, res) {
  try {
    const { id } = req.params;
    const blogComments = await Blog.findOne(
      { _id: id },
      { comments: 1 }
    ).populate("comments.commentor");

    if (!blogComments) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    return res.status(200).json({
      msg: "Comments sent",
      blogComments,
    });
  } catch (error) {
    console.error("Error while fetching blog comments: ", error);
    return res.status(400).json({ error });
  }
}

async function addComment(req, res) {
  try {
    const { userId, content } = req.body;
    const { id } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User not logged in" });
    }

    if (!id) {
      return res.status(400).json({ error: "Blog Id not received" });
    }
    const completeComment = {
      comment: content,
      commentor: userId,
    };
    const blog = await Blog.findById(id).populate("comments.commentor");

    blog.comments.push(completeComment);

    await blog.save();
    console.log(blog);
    return res.status(201).json({
      msg: "Comment added",
      blog,
    });
  } catch (error) {
    return res.status(400).json({ error });
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
  toggleLikes,
  addComment,
  getComments,
  getBlogBySlug,
};
