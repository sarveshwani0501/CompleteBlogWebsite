// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Heart,
//   Clock,
//   MessageCircle,
//   Tag,
//   Eye,
//   Share2,
//   ArrowLeft,
//   Calendar,
//   Send,
// } from "lucide-react";
// import MarkdownPreview from "@uiw/react-markdown-preview";
// import { selectUser } from "../features/authSlicer";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   selectCurrentBlog,
//   toggleLikes,
//   addComment,
// } from "../features/blogSlicer";

// export default function Blog() {
//   const dispatch = useDispatch();
//   const blog = useSelector(selectCurrentBlog);
//   const user = useSelector(selectUser);
//   console.log(user);
//   const [isLiked, setIsLiked] = useState(
//     blog.likes.includes(user?._id) || false
//   );
//   const [comment, setComment] = useState("");
//   const [showComments, setShowComments] = useState(false);
//   const [readingProgress, setReadingProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight =
//         document.documentElement.scrollHeight - window.innerHeight;
//       const progress = (scrollTop / docHeight) * 100;
//       setReadingProgress(Math.min(progress, 100));
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "Recently";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // Handle like toggle
//   const handleLike = async () => {
//     setIsLiked(!isLiked);
//     try {
//       //blog.userId = user._id;
//       let blog2 = {
//         ...blog,
//         userId: user?._id,
//       };
//       console.log(blog2);
//       const resultAction = await dispatch(toggleLikes(blog2));
//       if (!toggleLikes.fulfilled.match(resultAction)) {
//         alert("Error occured");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Handle comment submission
//   const handleCommentSubmit = async () => {
//     if (comment.trim()) {
//       // TODO: Implement comment submission
//       try {
//         const commentBody = {};
//         commentBody.content = comment;
//         commentBody.userId = user._id;
//         commentBody._id = blog._id;
//         const resultAction = await dispatch(addComment(commentBody));
//         if (addComment.fulfilled.match(resultAction)) {
//           alert("Comment added");
//         } else {
//           alert("error occured");
//         }
//       } catch (error) {
//         console.error(err);
//       }
//     }
//   };
//   console.log("this  is a   blog,", blog?.author?.userName);
//   // Handle share
//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: currentBlog?.title,
//           text: currentBlog?.body?.substring(0, 120) + "...",
//           url: window.location.href,
//         });
//       } catch (err) {
//         console.log("Error sharing:", err);
//       }
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(window.location.href);
//     }
//   };

//   if (!blog) {
//     return <BlogSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-50">
//       {/* Reading Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-slate-200 z-50">
//         <div
//           className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
//           style={{ width: `${readingProgress}%` }}
//         />
//       </div>

//       {/* Navigation */}
//       <nav className="sticky top-0 z-40 bg-white/95 dark:bg-slate-100/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-slate-200/50">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => window.history.back()}
//               className="flex items-center space-x-2 text-gray-600 dark:text-slate-600 hover:text-gray-900 dark:hover:text-slate-900 transition-colors duration-200"
//             >
//               <ArrowLeft className="h-5 w-5" />
//               <span className="text-sm font-medium hidden sm:inline">Back</span>
//             </button>

//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={handleShare}
//                 className="p-2 rounded-full bg-gray-100 dark:bg-slate-200 hover:bg-gray-200 dark:hover:bg-slate-300 transition-colors duration-200"
//               >
//                 <Share2 className="h-5 w-5 text-gray-600 dark:text-slate-600" />
//               </button>
//               <button
//                 onClick={() => (window.location.href = "/")}
//                 className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-600 transition-colors duration-200"
//               >
//                 All Blogs
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <header className="mb-8">
//           {/* Tags */}
//           {blog.tags && blog.tags.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-6">
//               {blog.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-50/80 text-blue-700 dark:text-blue-700 border border-blue-200/50 dark:border-blue-200/30"
//                 >
//                   <Tag className="h-3 w-3 mr-1" />
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* Title */}
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-900 leading-tight mb-6">
//             {blog.title}
//           </h1>

//           {/* Author & Meta Info */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//                 <span className="text-white text-lg font-semibold">
//                   {blog.author?.userName?.charAt(0) || "A"}
//                 </span>
//               </div>
//               <div>
//                 <p className="text-lg font-semibold text-gray-900 dark:text-slate-900">
//                   {blog.author?.userName || "Anonymous"}
//                 </p>
//                 <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-500">
//                   <div className="flex items-center space-x-1">
//                     <Calendar className="h-4 w-4" />
//                     <span>{formatDate(blog.createdAt)}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Clock className="h-4 w-4" />
//                     <span>{blog.readTime || "5 min read"}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Engagement Stats */}
//             <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-slate-500">
//               <div className="flex items-center space-x-1">
//                 <Eye className="h-4 w-4" />
//                 <span>{blog.views || 0} views</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Heart className="h-4 w-4" />
//                 <span>{blog.likes?.length || 0} likes</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <MessageCircle className="h-4 w-4" />
//                 <span>{blog.comments?.length || 0} comments</span>
//               </div>
//             </div>
//           </div>

//           {/* Cover Image */}
//           {blog.coverImage && blog.coverImage.trim() !== "" && (
//             <div className="relative overflow-hidden rounded-2xl mb-8 aspect-[16/9] lg:aspect-[21/9]">
//               <img
//                 src={blog.coverImage}
//                 alt={blog.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//             </div>
//           )}
//         </header>

//         {/* Content */}
//         <div className="prose prose-lg max-w-none mb-12">
//           <div className="text-gray-700 dark:text-slate-700 leading-relaxed text-lg">
//             {/* {blog.body?.split("\n").map((paragraph, index) => (
//               <p key={index} className="mb-6 first:mt-0 last:mb-0">
//                 {paragraph}
//               </p>
//             ))} */}
//             <MarkdownPreview
//               source={blog.body}
//               style={{ background: "#F9FAFB", color: "black" }}
//             />
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 dark:border-slate-200 mb-8">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={handleLike}
//               className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
//                 isLiked
//                   ? "bg-red-50 dark:bg-red-50/80 text-red-600 dark:text-red-600"
//                   : "bg-gray-100 dark:bg-slate-200 text-gray-600 dark:text-slate-600 hover:bg-gray-200 dark:hover:bg-slate-300"
//               }`}
//             >
//               <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
//               <span className="font-medium">{isLiked ? "Liked" : "Like"}</span>
//             </button>

//             <button
//               onClick={() => setShowComments(!showComments)}
//               className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-200 text-gray-600 dark:text-slate-600 hover:bg-gray-200 dark:hover:bg-slate-300 transition-colors duration-200"
//             >
//               <MessageCircle className="h-5 w-5" />
//               <span className="font-medium">Comment</span>
//             </button>
//           </div>

//           <button
//             onClick={handleShare}
//             className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-50/80 text-blue-600 dark:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-100/80 transition-colors duration-200"
//           >
//             <Share2 className="h-5 w-5" />
//             <span className="font-medium">Share</span>
//           </button>
//         </div>

//         {/* Comments Section */}
//         {showComments && (
//           <div className="mb-8">
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-900 mb-6">
//               Comments ({blog.comments?.length || 0})
//             </h3>

//             {/* Comment Form */}
//             <div className="mb-8">
//               <div className="relative">
//                 <textarea
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   placeholder="Share your thoughts..."
//                   className="w-full p-4 border border-gray-300 dark:border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24 text-gray-900 dark:text-slate-900 bg-white dark:bg-slate-100"
//                 />
//                 <button
//                   onClick={handleCommentSubmit}
//                   disabled={!comment.trim()}
//                   className="absolute bottom-4 right-4 p-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Send className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Comments List */}
//             <div className="space-y-6">
//               {blog.comments?.map((comment, index) => (
//                 <div key={index} className="flex space-x-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-white text-sm font-semibold">
//                       {comment.commentor?.userName?.charAt(0) || "A"}
//                     </span>
//                   </div>
//                   <div className="flex-1">
//                     <div className="bg-white dark:bg-slate-100 rounded-xl p-4 shadow-sm border border-gray-200/50 dark:border-slate-200/50">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="font-medium text-gray-900 dark:text-slate-900">
//                           {comment.commentor?.userName || "Anonymous"}
//                         </span>
//                         <span className="text-xs text-gray-500 dark:text-slate-500">
//                           {formatDate(comment.commentedAt)}
//                         </span>
//                       </div>
//                       <p className="text-gray-700 dark:text-slate-700">
//                         {comment.comment}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Related Articles */}
//         <div className="border-t border-gray-200 dark:border-slate-200 pt-8">
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-900 mb-6">
//             Related Articles
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Placeholder for related articles */}
//             <div className="bg-white dark:bg-slate-100 rounded-xl p-6 shadow-sm border border-gray-200/50 dark:border-slate-200/50">
//               <div className="w-full h-32 bg-gray-200 dark:bg-slate-200 rounded-lg mb-4" />
//               <h4 className="font-semibold text-gray-900 dark:text-slate-900 mb-2">
//                 Related Article Title
//               </h4>
//               <p className="text-sm text-gray-600 dark:text-slate-600">
//                 Brief description of the related article...
//               </p>
//             </div>
//             <div className="bg-white dark:bg-slate-100 rounded-xl p-6 shadow-sm border border-gray-200/50 dark:border-slate-200/50">
//               <div className="w-full h-32 bg-gray-200 dark:bg-slate-200 rounded-lg mb-4" />
//               <h4 className="font-semibold text-gray-900 dark:text-slate-900 mb-2">
//                 Another Related Article
//               </h4>
//               <p className="text-sm text-gray-600 dark:text-slate-600">
//                 Brief description of another related article...
//               </p>
//             </div>
//           </div>
//         </div>
//       </article>
//     </div>
//   );
// }

// function BlogSkeleton() {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="animate-pulse">
//           {/* Header skeleton */}
//           <div className="mb-8">
//             <div className="flex space-x-2 mb-6">
//               <div className="h-4 bg-gray-200 dark:bg-slate-200 rounded w-20" />
//               <div className="h-4 bg-gray-200 dark:bg-slate-200 rounded w-4" />
//               <div className="h-4 bg-gray-200 dark:bg-slate-200 rounded w-20" />
//             </div>

//             <div className="flex space-x-2 mb-6">
//               <div className="h-6 bg-gray-200 dark:bg-slate-200 rounded-full w-16" />
//               <div className="h-6 bg-gray-200 dark:bg-slate-200 rounded-full w-20" />
//             </div>

//             <div className="h-12 bg-gray-200 dark:bg-slate-200 rounded mb-6" />

//             <div className="flex items-center space-x-4 mb-8">
//               <div className="w-12 h-12 bg-gray-200 dark:bg-slate-200 rounded-full" />
//               <div className="space-y-2">
//                 <div className="h-4 bg-gray-200 dark:bg-slate-200 rounded w-32" />
//                 <div className="h-3 bg-gray-200 dark:bg-slate-200 rounded w-24" />
//               </div>
//             </div>

//             <div className="h-64 bg-gray-200 dark:bg-slate-200 rounded-2xl mb-8" />
//           </div>

//           {/* Content skeleton */}
//           <div className="space-y-4 mb-8">
//             <div className="h-4 bg-gray-200 dark:bg-slate-200 rounded w-full" />
//             <div className="h-4 bg-gray-200 dark:bg-slate-200 rounded w-full" />
//             <div className="h-4 bg-gray-200 dark:bg-slate-200 rounded w-3/4" />
//             <div className="h-4 bg-gray-200 dark:bg-slate-200 rounded w-full" />
//             <div className="h-4 bg-gray-200 dark:bg-slate-200 rounded w-5/6" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  Clock,
  MessageCircle,
  Tag,
  Eye,
  Share2,
  ArrowLeft,
  Calendar,
  Send,
} from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { selectUser } from "../features/authSlicer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentBlog,
  toggleLikes,
  addComment,
  getAllBlogs,
} from "../features/blogSlicer";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localBlog, setLocalBlog] = useState(null);
  const [addedComment, setAddedComment] = useState(false);
  // Handle like toggle
  const handleLike = async () => {
    setIsLiked(!isLiked);
    try {
      //blog.userId = user._id;
      let blog2 = {
        ...localBlog,
        userId: user?._id,
      };
      console.log(blog2);
      const resultAction = await dispatch(toggleLikes(blog2));
      if (!toggleLikes.fulfilled.match(resultAction)) {
        alert("Error occured");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle comment submission
  useEffect(() => {
    async function getAllBlog() {
      await dispatch(getAllBlogs([]));
    }
    getAllBlog();
  }, [dispatch]);

  const blogFromRedux = useSelector(selectCurrentBlog);

  const fetchBlog = useCallback(async () => {
    if (slug) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/blogs/slug/${slug}`,
          { withCredentials: true }
        );
        setLocalBlog(response.data.blog);
      } catch (error) {
        const msg = error?.response?.data?.msg || error.message;
        console.error("Failed to fetch blog:", msg);
      }
    }
  }, [slug]);

  useEffect(() => {
    if (!blogFromRedux) {
      fetchBlog();
    } else {
      setLocalBlog(blogFromRedux);
    }
  }, [slug, blogFromRedux, fetchBlog]);

  const user = useSelector(selectUser);
  console.log(user);

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      // TODO: Implement comment submission
      try {
        const commentBody = {};
        commentBody.content = comment;
        commentBody.userId = user._id;
        commentBody._id = localBlog._id;
        const resultAction = await dispatch(addComment(commentBody));
        if (addComment.fulfilled.match(resultAction)) {
          await fetchBlog();
          setComment("");
        } else {
          alert("error occured");
        }
      } catch (error) {
        console.error(err);
      } finally {
        setAddedComment(true);
      }
    }
  };

  const [isLiked, setIsLiked] = useState(
    localBlog?.likes?.includes(user?._id) || false
  );
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  console.log("this  is a   blog,", localBlog?.author?.userName);
  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: localBlog?.title,
          text: localBlog?.body?.substring(0, 120) + "...",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!localBlog) {
    return <BlogSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={() => navigate("/")}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                All Blogs
              </button>
            </div>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          {/* Tags */}
          {localBlog.tags && localBlog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {localBlog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50 transition-colors duration-200"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6 transition-colors duration-200">
            {localBlog.title}
          </h1>

          {/* Author & Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {localBlog.author?.userName?.charAt(0) || "A"}
                </span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                  {localBlog.author?.userName || "Anonymous"}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(localBlog.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{localBlog.readTime || "5 min read"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{localBlog.views || 0} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{localBlog.likes?.length || 0} likes</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{localBlog.comments?.length || 0} comments</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {localBlog.coverImage && localBlog.coverImage.trim() !== "" && (
            <div className="relative overflow-hidden rounded-2xl mb-8 aspect-[16/9] lg:aspect-[21/9]">
              <img
                src={localBlog.coverImage}
                alt={localBlog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg transition-colors duration-200">
            <MarkdownPreview
              source={localBlog.body}
              style={{
                backgroundColor: "transparent",
                color: "inherit",
              }}
              data-color-mode="auto"
              wrapperElement={{
                "data-color-mode": "auto",
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 dark:border-gray-700 mb-8 transition-colors duration-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isLiked
                  ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              <span className="font-medium">{isLiked ? "Liked" : "Like"}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Comment</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200"
          >
            <Share2 className="h-5 w-5" />
            <span className="font-medium">Share</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
              Comments ({localBlog.comments?.length || 0})
            </h3>

            {/* Comment Form */}
            <div className="mb-8">
              <div className="relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24 text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                />
                <button
                  onClick={handleCommentSubmit}
                  disabled={!comment.trim()}
                  className="absolute bottom-4 right-4 p-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {localBlog.comments?.map((comment, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">
                      {comment.commentor?.userName?.charAt(0) || "A"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {comment.commentor?.userName || "Anonymous"}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(comment.commentedAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
      </article>
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="flex space-x-2 mb-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 transition-colors duration-200" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4 transition-colors duration-200" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 transition-colors duration-200" />
            </div>

            <div className="flex space-x-2 mb-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 transition-colors duration-200" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 transition-colors duration-200" />
            </div>

            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6 transition-colors duration-200" />

            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-200" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 transition-colors duration-200" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 transition-colors duration-200" />
              </div>
            </div>

            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8 transition-colors duration-200" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-4 mb-8">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full transition-colors duration-200" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full transition-colors duration-200" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 transition-colors duration-200" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full transition-colors duration-200" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 transition-colors duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
