// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   selectUserBlogs,
//   getBlogById,
//   deleteBlog,
//   getAllBlogs,
// } from "../features/blogSlicer";
// import {
//   Heart,
//   Clock,
//   MessageCircle,
//   Eye,
//   Edit3,
//   Trash2,
//   Plus,
//   Settings,
//   ArrowUpRight,
//   AlertTriangle,
//   X,
// } from "lucide-react";
// import { selectUser } from "../features/authSlicer";

// export default function UserBlogs() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(selectUser);
//   const userBlogs = useSelector((state) => selectUserBlogs(state, user.userName));
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [blogToDelete, setBlogToDelete] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     async function getAllBlog() {
//       await dispatch(getAllBlogs([]));
//     }
//     getAllBlog();
//   }, [dispatch]);

//   const handleEditBlog = async (blog) => {
//     try {
//       const resultAction = await dispatch(getBlogById(blog._id));
//       if (getBlogById.fulfilled.match(resultAction)) {
//         navigate(`/blog/edit/${blog.slug}`);
//       } else {
//         console.error("Error loading blog");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//     }
//   };

//   const handleDeleteBlog = async (blog) => {
//     setBlogToDelete(blog);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!blogToDelete) return;

//     setIsDeleting(true);
//     try {
//       const resultAction = await dispatch(deleteBlog(blogToDelete._id));
//       if (deleteBlog.fulfilled.match(resultAction)) {
//         setShowDeleteModal(false);
//         setBlogToDelete(null);
//         await dispatch(getAllBlogs([]));
//       } else {
//         console.error("Failed to delete blog");
//       }
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteModal(false);
//     setBlogToDelete(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-50">
//       <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header Section */}
//         <div className="max-w-7xl mx-auto mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-900 mb-2">
//                 My Blogs
//               </h1>
//               <p className="text-gray-600 dark:text-slate-600">
//                 Manage your published articles and drafts
//               </p>
//             </div>
//             {userBlogs.length > 0 && (
//               <button
//                 onClick={() => navigate("/create-blog")}
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 New Blog
//               </button>
//             )}
//           </div>

//           {/* Stats Bar */}
//           <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="bg-white dark:bg-slate-100 rounded-lg p-4 border border-gray-200/50 dark:border-slate-200/50">
//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-blue-100 dark:bg-blue-50 rounded-lg flex items-center justify-center">
//                   <Eye className="h-4 w-4 text-blue-600 dark:text-blue-500" />
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-500 dark:text-slate-500">
//                     Total Blogs
//                   </p>
//                   <p className="text-lg font-semibold text-gray-900 dark:text-slate-900">
//                     {userBlogs?.length || 0}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-slate-100 rounded-lg p-4 border border-gray-200/50 dark:border-slate-200/50">
//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-green-100 dark:bg-green-50 rounded-lg flex items-center justify-center">
//                   <Heart className="h-4 w-4 text-green-600 dark:text-green-500" />
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-500 dark:text-slate-500">
//                     Total Likes
//                   </p>
//                   <p className="text-lg font-semibold text-gray-900 dark:text-slate-900">
//                     {userBlogs?.reduce(
//                       (total, blog) => total + (blog.likes?.length || 0),
//                       0
//                     ) || 0}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-slate-100 rounded-lg p-4 border border-gray-200/50 dark:border-slate-200/50">
//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-purple-100 dark:bg-purple-50 rounded-lg flex items-center justify-center">
//                   <MessageCircle className="h-4 w-4 text-purple-600 dark:text-purple-500" />
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-500 dark:text-slate-500">
//                     Total Comments
//                   </p>
//                   <p className="text-lg font-semibold text-gray-900 dark:text-slate-900">
//                     {userBlogs?.reduce(
//                       (total, blog) => total + (blog.comments?.length || 0),
//                       0
//                     ) || 0}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Blog Grid */}
//         {!userBlogs || userBlogs.length === 0 ? (
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center py-12">
//               <div className="w-16 h-16 bg-gray-200 dark:bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Settings className="h-8 w-8 text-gray-400 dark:text-slate-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 dark:text-slate-900 mb-2">
//                 No blogs yet
//               </h3>
//               <p className="text-gray-600 dark:text-slate-600 mb-6">
//                 Start sharing your thoughts and ideas with the world.
//               </p>
//               <button
//                 onClick={() => navigate("/blog/create")}
//                 className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Create Your First Blog
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="max-w-7xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//               {userBlogs.map((blog) => (
//                 <UserBlogCard
//                   key={blog.slug}
//                   blog={blog}
//                   onEdit={handleEditBlog}
//                   onDelete={handleDeleteBlog}
//                   dispatch={dispatch}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <DeleteConfirmationModal
//           blog={blogToDelete}
//           isDeleting={isDeleting}
//           onConfirm={confirmDelete}
//           onCancel={cancelDelete}
//         />
//       )}
//     </div>
//   );
// }

// function UserBlogCard({ blog, onEdit, onDelete, dispatch }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();

//   const formatDate = (dateString) => {
//     if (!dateString) return "Recently";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const truncateText = (text, maxLength = 120) => {
//     if (!text) return "";
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + "...";
//   };

//   const handleViewBlog = async (e) => {
//     e.preventDefault();
//     try {
//       const resultAction = await dispatch(getBlogById(blog._id));
//       if (getBlogById.fulfilled.match(resultAction)) {
//         navigate(`/blog/${blog.slug}`);
//       } else {
//         console.error("Error loading blog");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//     }
//   };

//   const handleEdit = (e) => {
//     e.stopPropagation();
//     onEdit(blog);
//   };

//   const handleDelete = (e) => {
//     e.stopPropagation();
//     onDelete(blog);
//   };

//   return (
//     <div
//       className="group relative bg-white dark:bg-slate-100 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-200/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Action Buttons */}
//       <div className="absolute top-4 right-4 z-30 flex space-x-2">
//         <button
//           onClick={handleEdit}
//           className="w-8 h-8 bg-white/90 dark:bg-slate-100/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-white dark:hover:bg-slate-100 transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
//           title="Edit blog"
//         >
//           <Edit3 className="h-4 w-4" />
//         </button>
//         <button
//           onClick={handleDelete}
//           className="w-8 h-8 bg-white/90 dark:bg-slate-100/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-slate-600 hover:text-red-600 dark:hover:text-red-500 hover:bg-white dark:hover:bg-slate-100 transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
//           title="Delete blog"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>

//       {/* Hover overlay effect */}
//       <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

//       {/* Cover Image */}
//       <div
//         className="relative overflow-hidden cursor-pointer"
//         onClick={handleViewBlog}
//       >
//         {blog.coverImage && blog.coverImage.trim() !== "" ? (
//           <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-50 dark:to-purple-50 overflow-hidden">
//             <img
//               src={blog.coverImage}
//               alt={blog.title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//           </div>
//         ) : (
//           <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-50 dark:via-purple-25 dark:to-pink-50 flex items-center justify-center relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10" />
//             <div className="text-6xl font-bold text-blue-500/20 dark:text-blue-400/20 select-none">
//               {blog.title.charAt(0).toUpperCase()}
//             </div>
//           </div>
//         )}

//         {/* Read time badge */}
//         <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-100/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 dark:text-slate-600 shadow-sm">
//           <Clock className="h-3 w-3 inline mr-1" />
//           {blog.readTime || "5 min read"}
//         </div>
//       </div>

//       <div className="p-6 relative z-20">
//         {/* Tags */}
//         {blog.tags && blog.tags.length > 0 && (
//           <div className="flex flex-wrap gap-1.5 mb-4">
//             {blog.tags.slice(0, 2).map((tag) => (
//               <span
//                 key={tag}
//                 className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-50/80 text-blue-700 dark:text-blue-700 border border-blue-200/50 dark:border-blue-200/30"
//               >
//                 {tag}
//               </span>
//             ))}
//             {blog.tags.length > 2 && (
//               <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-slate-200 text-gray-600 dark:text-slate-600">
//                 +{blog.tags.length - 2}
//               </span>
//             )}
//           </div>
//         )}

//         {/* Title */}
//         <button onClick={handleViewBlog} className="w-full text-left">
//           <h2 className="text-xl font-bold text-gray-900 dark:text-slate-900 mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 line-clamp-2">
//             {blog.title}
//           </h2>
//         </button>

//         {/* Body Preview */}
//         <p className="text-gray-600 dark:text-slate-600 leading-relaxed line-clamp-3 mb-6 text-sm">
//           {truncateText(blog.body, 140)}
//         </p>

//         {/* Date and View Button */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             <div className="text-sm text-gray-500 dark:text-slate-500">
//               Published {formatDate(blog.createdAt)}
//             </div>
//           </div>

//           <button
//             onClick={handleViewBlog}
//             className={`transition-all duration-300 ${
//               isHovered
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-2"
//             }`}
//           >
//             <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-500" />
//           </button>
//         </div>

//         {/* Engagement Stats */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-200">
//           <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-500">
//             {/* Likes */}
//             <div className="flex items-center space-x-1">
//               <Heart className="h-4 w-4" />
//               <span className="font-medium">{blog.likes?.length || 0}</span>
//             </div>

//             {/* Comments */}
//             <div className="flex items-center space-x-1">
//               <MessageCircle className="h-4 w-4" />
//               <span className="font-medium">{blog.comments?.length || 0}</span>
//             </div>
//           </div>

//           {/* Status indicator */}
//           <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-slate-400">
//             <div className="w-2 h-2 bg-green-400 rounded-full" />
//             <span>Published</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function DeleteConfirmationModal({ blog, isDeleting, onConfirm, onCancel }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white dark:bg-slate-100 rounded-2xl shadow-xl max-w-md w-full p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-red-100 dark:bg-red-50 rounded-full flex items-center justify-center">
//               <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-900">
//               Delete Blog
//             </h3>
//           </div>
//           <button
//             onClick={onCancel}
//             className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-600 transition-colors duration-200"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <p className="text-gray-600 dark:text-slate-600 mb-6">
//           Are you sure you want to delete "<strong>{blog?.title}</strong>"? This
//           action cannot be undone.
//         </p>

//         <div className="flex space-x-3">
//           <button
//             onClick={onCancel}
//             disabled={isDeleting}
//             className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-300 text-gray-700 dark:text-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors duration-200 disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={isDeleting}
//             className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
//           >
//             {isDeleting ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
//                 Deleting...
//               </>
//             ) : (
//               "Delete"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserBlogs,
  getBlogById,
  deleteBlog,
  getAllBlogs,
} from "../features/blogSlicer";
import {
  Heart,
  Clock,
  MessageCircle,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Settings,
  ArrowUpRight,
  AlertTriangle,
  X,
} from "lucide-react";
import { selectUser } from "../features/authSlicer";

export default function UserBlogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userBlogs = useSelector((state) =>
    selectUserBlogs(state, user.userName)
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function getAllBlog() {
      await dispatch(getAllBlogs([]));
    }
    getAllBlog();
  }, [dispatch]);

  const handleEditBlog = async (blog) => {
    try {
      const resultAction = await dispatch(getBlogById(blog._id));
      if (getBlogById.fulfilled.match(resultAction)) {
        navigate(`/blog/edit/${blog.slug}`);
      } else {
        console.error("Error loading blog");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleDeleteBlog = async (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;

    setIsDeleting(true);
    try {
      const resultAction = await dispatch(deleteBlog(blogToDelete._id));
      if (deleteBlog.fulfilled.match(resultAction)) {
        setShowDeleteModal(false);
        setBlogToDelete(null);
        await dispatch(getAllBlogs([]));
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Blogs
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your published articles and drafts
              </p>
            </div>
            {userBlogs.length > 0 && (
              <button
                onClick={() => navigate("/create-blog")}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Blog
              </button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Blogs
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userBlogs?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                  <Heart className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Likes
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userBlogs?.reduce(
                      (total, blog) => total + (blog.likes?.length || 0),
                      0
                    ) || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Comments
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userBlogs?.reduce(
                      (total, blog) => total + (blog.comments?.length || 0),
                      0
                    ) || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {!userBlogs || userBlogs.length === 0 ? (
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No blogs yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start sharing your thoughts and ideas with the world.
              </p>
              <button
                onClick={() => navigate("/blog/create")}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Blog
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {userBlogs.map((blog) => (
                <UserBlogCard
                  key={blog.slug}
                  blog={blog}
                  onEdit={handleEditBlog}
                  onDelete={handleDeleteBlog}
                  dispatch={dispatch}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          blog={blogToDelete}
          isDeleting={isDeleting}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

function UserBlogCard({ blog, onEdit, onDelete, dispatch }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleViewBlog = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(getBlogById(blog._id));
      if (getBlogById.fulfilled.match(resultAction)) {
        navigate(`/blog/${blog.slug}`);
      } else {
        console.error("Error loading blog");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(blog);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(blog);
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-30 flex space-x-2">
        <button
          onClick={handleEdit}
          className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          title="Edit blog"
        >
          <Edit3 className="h-4 w-4" />
        </button>
        <button
          onClick={handleDelete}
          className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          title="Delete blog"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Cover Image */}
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={handleViewBlog}
      >
        {blog.coverImage && blog.coverImage.trim() !== "" ? (
          <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20" />
            <div className="text-6xl font-bold text-blue-500/20 dark:text-blue-400/30 select-none">
              {blog.title.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        {/* Read time badge */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm">
          <Clock className="h-3 w-3 inline mr-1" />
          {blog.readTime || "5 min read"}
        </div>
      </div>

      <div className="p-6 relative z-20">
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {blog.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 2 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                +{blog.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <button onClick={handleViewBlog} className="w-full text-left">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            {blog.title}
          </h2>
        </button>

        {/* Body Preview */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-6 text-sm">
          {truncateText(blog.body, 140)}
        </p>

        {/* Date and View Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Published {formatDate(blog.createdAt)}
            </div>
          </div>

          <button
            onClick={handleViewBlog}
            className={`transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
            }`}
          >
            <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </button>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            {/* Likes */}
            <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-red-500">
              <Heart className="h-4 w-4" />
              <span className="font-medium">{blog.likes?.length || 0}</span>
            </div>

            {/* Comments */}
            <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-blue-500">
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">{blog.comments?.length || 0}</span>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span>Published</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmationModal({ blog, isDeleting, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Blog
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete "<strong>{blog?.title}</strong>"? This
          action cannot be undone.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}