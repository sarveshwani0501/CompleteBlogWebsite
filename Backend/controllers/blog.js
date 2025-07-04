const Blog = require("../models/blog");
const User = require("../models/user");
const slugify = require("slugify");
const uploadToCloudinary = require("../utils/cloudinary");

async function getAllBlogs(req, res) {
  try {
    const { tags } = req.query;
    const tagList = tags ? tags.split(",") : [];
    if (tagList.length == 0) {
      const blogs = await Blog.find({});
      return res.status(200).json({ msg: "Blog request success", blogs });
    }
    const allBlogs = await Blog.find({ tags: { $in: tagList } });

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

    await Blog.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateBlog(req, res) {
  try {
    const {updates} = req.body;
    const id = req.params.id;
    //console.log(updates);
    if (updates.title) {
      updates.slug = slugify(updates.title, { lower: true, strict: true });
    }
    //console.log(updates);
    // const updatedBlog = await Blog.findByIdAndUpdate(
    //   { _id: id },
    //   { $set: updates },
    //   { new: true }
    // );
    const blog = await Blog.findById(id);
    if (updates.blogBody) {
      blog.body = updates.blogBody;
    }
    if (updates.title) {
      blog.title = updates.title;
      blog.slug = updates.slug;
    }
    await blog.save();
    //console.log(blog);
    if (!blog) {
      return res.status(400).json({ msg: "Blog not found" });
    }

    return res.status(200).json(blog);
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

async function toggleLikes(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(123);
    if (!id) {
      return res.status(400).json({ error: "Blog id missing" });
    }
    if (!userId) {
      return res.status(400).json({ error: "User not logged in" });
    }
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
      likesCount: blog.likes.length,
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
    console.error("Error while fetching blog comments: ", error)
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
    const blog = await Blog.findById(id);

    blog.comments.push(completeComment);

    await blog.save();

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
};
