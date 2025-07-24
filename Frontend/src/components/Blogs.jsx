// import { useState, useEffect, useRef } from "react";
// import tags from "../utils/tags";
// import { getAllBlogs } from "../features/blogSlicer";
// import { useNavigate } from "react-router-dom";
// // import {} from ""
// import { useDispatch, useSelector } from "react-redux";
// import { selectAllBlogs, getBlogById } from "../features/blogSlicer";
// import { selectRecentBlogs } from "../features/blogSlicer";
// import {
//   Heart,
//   Clock,
//   MessageCircle,
//   Tag,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUpRight,
// } from "lucide-react";

// export default function AllBlogs() {
//   const [selectedTags, setSelectedTags] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(
//     function getAllBlog() {
//       dispatch(getAllBlogs(selectedTags));
//     },
//     [selectedTags, dispatch]
//   );
//   const blogs = useSelector(selectAllBlogs);

//   function handleSelectedTags(tag) {
//     if (selectedTags.includes(tag)) {
//       const newTags = selectedTags.filter((arrTag) => arrTag !== tag);
//       setSelectedTags(newTags);
//     } else {
//       const newTags = [...selectedTags, tag];
//       setSelectedTags(newTags);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-50">
//       <BlogTagsFilter
//         handleChangeInTags={handleSelectedTags}
//         selectedTags={selectedTags}
//       />

//       <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header Section */}
//         <div className="max-w-7xl mx-auto mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-900 mb-2">
//             All Blogs
//           </h1>
//           <p className="text-gray-600 dark:text-slate-600">
//             Discover amazing stories and insights from our community
//           </p>
//           {selectedTags.length > 0 && (
//             <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-slate-600">
//               <Tag className="h-4 w-4" />
//               <span>Filtered by: {selectedTags.join(", ")}</span>
//             </div>
//           )}
//         </div>

//         {/* Blog Grid */}
//         {blogs.length === 0 ? (
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center py-12">
//               <div className="w-16 h-16 bg-gray-200 dark:bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Eye className="h-8 w-8 text-gray-400 dark:text-slate-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 dark:text-slate-900 mb-2">
//                 No blogs found
//               </h3>
//               <p className="text-gray-600 dark:text-slate-600">
//                 Try adjusting your filters or check back later for new content.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="max-w-7xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//               {blogs.map((blog) => (
//                 <BlogCard key={blog.slug} blog={blog} dispatch={dispatch} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function BlogCard({ blog, dispatch }) {
//   const [isHovered, setIsHovered] = useState(false);

//   // Format date if available
//   const formatDate = (dateString) => {
//     if (!dateString) return "Recently";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };
//   const navigate = useNavigate();
//   // Truncate body text for preview
//   const truncateText = (text, maxLength = 120) => {
//     if (!text) return "";
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + "...";
//   };

//   async function handleLinkClick(e) {
//     e.preventDefault();
//     //console.log(2);
//     try {
//       //console.log(blog);
//       const resultAction = await dispatch(getBlogById(blog._id));
//       //console.log(resultAction)
//       if (getBlogById.fulfilled.match(resultAction)) {
//         navigate(`/blog/${blog.slug}`);
//       } else {
//         //console.log(34324);
//         console.log("error");
//       }
//     } catch (error) {
//       console.error("some error occured", error);
//     }
//   }

//   return (
//     <button
//       onClick={handleLinkClick}
//       className="group relative bg-white dark:bg-slate-100 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-200/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Hover overlay effect */}
//       <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

//       {/* Cover Image */}
//       <div className="relative overflow-hidden">
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

//         {/* Floating read time badge */}
//         <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-100/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 dark:text-slate-600 shadow-sm">
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
//         <h2 className="text-xl font-bold text-gray-900 dark:text-slate-900 mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 line-clamp-2">
//           {blog.title}
//         </h2>

//         {/* Body Preview */}
//         <p className="text-gray-600 dark:text-slate-600 leading-relaxed line-clamp-3 mb-6 text-sm">
//           {truncateText(blog.body, 140)}
//         </p>

//         {/* Author and Date */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//               <span className="text-white text-sm font-semibold">
//                 {blog.author?.name?.charAt(0) || "A"}
//               </span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-900 dark:text-slate-900">
//                 {blog.author?.userName || "Anonymous"}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-slate-500">
//                 {formatDate(blog.createdAt)}
//               </p>
//             </div>
//           </div>

//           {/* Hover arrow */}
//           <div
//             className={`transition-all duration-300 ${
//               isHovered
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-2"
//             }`}
//           >
//             <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-500" />
//           </div>
//         </div>

//         {/* Engagement Stats */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-200">
//           <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-500">
//             {/* Likes */}
//             {blog.likes && (
//               <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-red-500">
//                 <Heart className="h-4 w-4" />
//                 <span className="font-medium">{blog.likes.length}</span>
//               </div>
//             )}

//             {/* Comments */}
//             {blog.comments && (
//               <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-blue-500">
//                 <MessageCircle className="h-4 w-4" />
//                 <span className="font-medium">{blog.comments.length}</span>
//               </div>
//             )}
//           </div>

//           {/* Engagement indicator */}
//           <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-slate-400">
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//             <span>Active</span>
//           </div>
//         </div>
//       </div>
//     </button>
//   );
// }

// function BlogTagsFilter({ handleChangeInTags, selectedTags }) {
//   const sliderRef = useRef(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);

//   // Check scroll position to show/hide arrows
//   const checkScrollPosition = () => {
//     if (sliderRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
//       setCanScrollLeft(scrollLeft > 0);
//       setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
//     }
//   };

//   // Initial check and resize listener
//   useEffect(() => {
//     checkScrollPosition();

//     const handleResize = () => {
//       checkScrollPosition();
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Check scroll position after tags change
//   useEffect(() => {
//     checkScrollPosition();
//   }, [selectedTags]);

//   const scroll = (direction) => {
//     if (sliderRef.current) {
//       const scrollAmount = 200;
//       sliderRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });

//       // Check scroll position after scroll animation
//       setTimeout(checkScrollPosition, 300);
//     }
//   };

//   return (
//     <div className="sticky top-16 z-40 w-full bg-white/95 dark:bg-slate-100/95 border-b border-gray-200/50 dark:border-slate-200/50 backdrop-blur-sm">
//       <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             <span className="text-sm font-medium text-gray-700 dark:text-slate-600 whitespace-nowrap hidden sm:block">
//               Filter by:
//             </span>

//             <div className="relative flex-1 min-w-0">
//               {/* Left Arrow - Only show when can scroll left */}
//               {canScrollLeft && (
//                 <button
//                   className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-100 shadow-md rounded-full p-1.5 sm:p-2 hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors duration-200"
//                   onClick={() => scroll("left")}
//                   aria-label="Scroll left"
//                 >
//                   <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-slate-600" />
//                 </button>
//               )}

//               {/* Scrollable Content */}
//               <div
//                 ref={sliderRef}
//                 className="flex overflow-hidden scroll-smooth space-x-2 px-0 sm:px-8 md:px-10"
//                 style={{
//                   paddingLeft: canScrollLeft ? "32px" : "0px",
//                   paddingRight: canScrollRight ? "32px" : "0px",
//                 }}
//                 onScroll={checkScrollPosition}
//               >
//                 {tags.map((tag) => (
//                   <RenderTag
//                     key={tag}
//                     tag={tag}
//                     handleTagChange={handleChangeInTags}
//                     isSelected={selectedTags.includes(tag)}
//                   />
//                 ))}
//               </div>

//               {/* Right Arrow - Only show when can scroll right */}
//               {canScrollRight && (
//                 <button
//                   className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-100 shadow-md rounded-full p-1.5 sm:p-2 hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors duration-200"
//                   onClick={() => scroll("right")}
//                   aria-label="Scroll right"
//                 >
//                   <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-slate-600" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function RenderTag({ tag, handleTagChange, isSelected }) {
//   function handleTagSelection() {
//     handleTagChange(tag);
//   }

//   return (
//     <button
//       key={tag}
//       onClick={handleTagSelection}
//       className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
//         isSelected
//           ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-sm"
//           : "bg-gray-200 dark:bg-slate-200 hover:bg-gray-300 dark:hover:bg-slate-300 text-gray-700 dark:text-slate-600 hover:text-gray-900 dark:hover:text-slate-900"
//       }`}
//     >
//       {tag}
//     </button>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import tags from "../utils/tags";
// import { getAllBlogs } from "../features/blogSlicer";
// import { useNavigate } from "react-router-dom";
// import MarkdownPreview from "@uiw/react-markdown-preview";
// // import {} from ""
// import { useDispatch, useSelector } from "react-redux";
// import { selectAllBlogs, getBlogById } from "../features/blogSlicer";
// import { selectRecentBlogs } from "../features/blogSlicer";
// import {
//   Heart,
//   Clock,
//   MessageCircle,
//   Tag,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUpRight,
// } from "lucide-react";

// export default function AllBlogs() {
//   const [selectedTags, setSelectedTags] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(
//     function getAllBlog() {
//       dispatch(getAllBlogs(selectedTags));
//     },
//     [selectedTags, dispatch]
//   );
//   const blogs = useSelector(selectAllBlogs);

//   function handleSelectedTags(tag) {
//     if (selectedTags.includes(tag)) {
//       const newTags = selectedTags.filter((arrTag) => arrTag !== tag);
//       setSelectedTags(newTags);
//     } else {
//       const newTags = [...selectedTags, tag];
//       setSelectedTags(newTags);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <BlogTagsFilter
//         handleChangeInTags={handleSelectedTags}
//         selectedTags={selectedTags}
//       />

//       <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header Section */}
//         <div className="max-w-7xl mx-auto mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             All Blogs
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Discover amazing stories and insights from our community
//           </p>
//           {selectedTags.length > 0 && (
//             <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//               <Tag className="h-4 w-4" />
//               <span>Filtered by: {selectedTags.join(", ")}</span>
//             </div>
//           )}
//         </div>

//         {/* Blog Grid */}
//         {blogs.length === 0 ? (
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center py-12">
//               <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Eye className="h-8 w-8 text-gray-400 dark:text-gray-500" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                 No blogs found
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Try adjusting your filters or check back later for new content.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="max-w-7xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//               {blogs.map((blog) => (
//                 <BlogCard key={blog.slug} blog={blog} dispatch={dispatch} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function BlogCard({ blog, dispatch }) {
//   const [isHovered, setIsHovered] = useState(false);

//   // Format date if available
//   const formatDate = (dateString) => {
//     if (!dateString) return "Recently";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };
//   const navigate = useNavigate();
//   // Truncate body text for preview
//   const truncateText = (text, maxLength = 120) => {
//     if (!text) return "";
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + "...";
//   };

//   async function handleLinkClick(e) {
//     e.preventDefault();
//     //console.log(2);
//     try {
//       //console.log(blog);
//       const resultAction = await dispatch(getBlogById(blog._id));
//       //console.log(resultAction)
//       if (getBlogById.fulfilled.match(resultAction)) {
//         navigate(`/blog/${blog.slug}`);
//       } else {
//         //console.log(34324);
//         console.log("error");
//       }
//     } catch (error) {
//       console.error("some error occured", error);
//     }
//   }

//   return (
//     <button
//       onClick={handleLinkClick}
//       className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Hover overlay effect */}
//       <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

//       {/* Cover Image */}
//       <div className="relative overflow-hidden">
//         {blog.coverImage && blog.coverImage.trim() !== "" ? (
//           <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 overflow-hidden">
//             <img
//               src={blog.coverImage}
//               alt={blog.title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//           </div>
//         ) : (
//           <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900 dark:via-purple-800 dark:to-pink-900 flex items-center justify-center relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20" />
//             <div className="text-6xl font-bold text-blue-500/20 dark:text-blue-400/30 select-none">
//               {blog.title.charAt(0).toUpperCase()}
//             </div>
//           </div>
//         )}

//         {/* Floating read time badge */}
//         <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm">
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
//                 className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50"
//               >
//                 {tag}
//               </span>
//             ))}
//             {blog.tags.length > 2 && (
//               <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
//                 +{blog.tags.length - 2}
//               </span>
//             )}
//           </div>
//         )}

//         {/* Title */}
//         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
//           {blog.title}
//         </h2>

//         {/* Body Preview */}
//         <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-6 text-sm">
//           <MarkdownPreview
//             source={truncateText(blog.body, 140)}
//             style={{
//               backgroundColor: "transparent",
//               color: "inherit",
//             }}
//             data-color-mode="auto"
//             wrapperElement={{
//               "data-color-mode": "auto",
//             }}
//           />
//         </p>

//         {/* Author and Date */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//               <span className="text-white text-sm font-semibold">
//                 {blog.author?.name?.charAt(0) || "A"}
//               </span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-900 dark:text-white">
//                 {blog.author?.userName || "Anonymous"}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {formatDate(blog.createdAt)}
//               </p>
//             </div>
//           </div>

//           {/* Hover arrow */}
//           <div
//             className={`transition-all duration-300 ${
//               isHovered
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-2"
//             }`}
//           >
//             <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//           </div>
//         </div>

//         {/* Engagement Stats */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
//           <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
//             {/* Likes */}
//             {blog.likes && (
//               <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-red-500">
//                 <Heart className="h-4 w-4" />
//                 <span className="font-medium">{blog.likes.length}</span>
//               </div>
//             )}

//             {/* Comments */}
//             {blog.comments && (
//               <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-blue-500">
//                 <MessageCircle className="h-4 w-4" />
//                 <span className="font-medium">{blog.comments.length}</span>
//               </div>
//             )}
//           </div>

//           {/* Engagement indicator */}
//           <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-500">
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//             <span>Active</span>
//           </div>
//         </div>
//       </div>
//     </button>
//   );
// }

// function BlogTagsFilter({ handleChangeInTags, selectedTags }) {
//   const sliderRef = useRef(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);

//   // Check scroll position to show/hide arrows
//   const checkScrollPosition = () => {
//     if (sliderRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
//       setCanScrollLeft(scrollLeft > 0);
//       setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
//     }
//   };

//   // Initial check and resize listener
//   useEffect(() => {
//     checkScrollPosition();

//     const handleResize = () => {
//       checkScrollPosition();
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Check scroll position after tags change
//   useEffect(() => {
//     checkScrollPosition();
//   }, [selectedTags]);

//   const scroll = (direction) => {
//     if (sliderRef.current) {
//       const scrollAmount = 200;
//       sliderRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });

//       // Check scroll position after scroll animation
//       setTimeout(checkScrollPosition, 300);
//     }
//   };

//   return (
//     <div className="sticky top-16 z-40 w-full bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm">
//       <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hidden sm:block">
//               Filter by:
//             </span>

//             <div className="relative flex-1 min-w-0">
//               {/* Left Arrow - Only show when can scroll left */}
//               {canScrollLeft && (
//                 <button
//                   className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-1.5 sm:p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                   onClick={() => scroll("left")}
//                   aria-label="Scroll left"
//                 >
//                   <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
//                 </button>
//               )}

//               {/* Scrollable Content */}
//               <div
//                 ref={sliderRef}
//                 className="flex overflow-hidden scroll-smooth space-x-2 px-0 sm:px-8 md:px-10"
//                 style={{
//                   paddingLeft: canScrollLeft ? "32px" : "0px",
//                   paddingRight: canScrollRight ? "32px" : "0px",
//                 }}
//                 onScroll={checkScrollPosition}
//               >
//                 {tags.map((tag) => (
//                   <RenderTag
//                     key={tag}
//                     tag={tag}
//                     handleTagChange={handleChangeInTags}
//                     isSelected={selectedTags.includes(tag)}
//                   />
//                 ))}
//               </div>

//               {/* Right Arrow - Only show when can scroll right */}
//               {canScrollRight && (
//                 <button
//                   className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-1.5 sm:p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//                   onClick={() => scroll("right")}
//                   aria-label="Scroll right"
//                 >
//                   <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function RenderTag({ tag, handleTagChange, isSelected }) {
//   function handleTagSelection() {
//     handleTagChange(tag);
//   }

//   return (
//     <button
//       key={tag}
//       onClick={handleTagSelection}
//       className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
//         isSelected
//           ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white shadow-sm"
//           : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
//       }`}
//     >
//       {tag}
//     </button>
//   );
// }

import { useState, useEffect, useRef } from "react";
import tags from "../utils/tags";
import { getAllBlogs } from "../features/blogSlicer";
import { useNavigate } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
// import {} from ""
import { useDispatch, useSelector } from "react-redux";
import { selectAllBlogs, getBlogById } from "../features/blogSlicer";
import { selectRecentBlogs } from "../features/blogSlicer";
import {
  Heart,
  Clock,
  MessageCircle,
  Tag,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

export default function AllBlogs() {
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(
    function getAllBlog() {
      dispatch(getAllBlogs(selectedTags));
    },
    [selectedTags, dispatch]
  );
  const blogs = useSelector(selectAllBlogs);

  function handleSelectedTags(tag) {
    if (selectedTags.includes(tag)) {
      const newTags = selectedTags.filter((arrTag) => arrTag !== tag);
      setSelectedTags(newTags);
    } else {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogTagsFilter
        handleChangeInTags={handleSelectedTags}
        selectedTags={selectedTags}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All Blogs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing stories and insights from our community
          </p>
          {selectedTags.length > 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Tag className="h-4 w-4" />
              <span>Filtered by: {selectedTags.join(", ")}</span>
            </div>
          )}
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or check back later for new content.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} dispatch={dispatch} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ blog, dispatch }) {
  const [isHovered, setIsHovered] = useState(false);

  // Format date if available
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const navigate = useNavigate();

  // Truncate body text for preview - FIXED: Strip markdown and just use plain text
  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    // Remove markdown syntax for plain text preview
    const plainText = text
      .replace(/#+\s/g, "") // Remove headers
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
      .replace(/\*(.*?)\*/g, "$1") // Remove italic
      .replace(/`(.*?)`/g, "$1") // Remove code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
      .replace(/\n/g, " ") // Replace newlines with spaces
      .trim();

    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + "...";
  };

  async function handleLinkClick(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent any event bubbling issues

    console.log("Blog card clicked:", blog.slug); // Debug log

    try {
      const resultAction = await dispatch(getBlogById(blog._id));
      console.log("getBlogById result:", resultAction); // Debug log

      if (getBlogById.fulfilled.match(resultAction)) {
        navigate(`/blog/${blog.slug}`);
      } else {
        console.log("getBlogById failed:", resultAction.error);
      }
    } catch (error) {
      console.error("Error in handleLinkClick:", error);
    }
  }

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleLinkClick}
    >
      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Cover Image */}
      <div className="relative overflow-hidden">
        {blog.coverImage && blog.coverImage.trim() !== "" ? (
          <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900 dark:via-purple-800 dark:to-pink-900 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20" />
            <div className="text-6xl font-bold text-blue-500/20 dark:text-blue-400/30 select-none">
              {blog.title.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        {/* Floating read time badge */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm">
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
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50"
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h2>

        {/* Body Preview - FIXED: Use plain text instead of MarkdownPreview */}
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-6 text-sm">
          {truncateText(blog.body, 140)}
        </p>

        {/* Author and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {blog.author?.name?.charAt(0) || "A"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {blog.author?.userName || "Anonymous"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(blog.createdAt)}
              </p>
            </div>
          </div>

          {/* Hover arrow */}
          <div
            className={`transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
            }`}
          >
            <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            {/* Likes */}
            {blog.likes && (
              <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-red-500">
                <Heart className="h-4 w-4" />
                <span className="font-medium">{blog.likes.length}</span>
              </div>
            )}

            {/* Comments */}
            {blog.comments && (
              <div className="flex items-center space-x-1 transition-colors duration-300 group-hover:text-blue-500">
                <MessageCircle className="h-4 w-4" />
                <span className="font-medium">{blog.comments.length}</span>
              </div>
            )}
          </div>

          {/* Engagement indicator */}
          <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogTagsFilter({ handleChangeInTags, selectedTags }) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Initial check and resize listener
  useEffect(() => {
    checkScrollPosition();

    const handleResize = () => {
      checkScrollPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check scroll position after tags change
  useEffect(() => {
    checkScrollPosition();
  }, [selectedTags]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      // Check scroll position after scroll animation
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <div className="sticky top-16 z-40 w-full bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap hidden sm:block">
              Filter by:
            </span>

            <div className="relative flex-1 min-w-0">
              {/* Left Arrow - Only show when can scroll left */}
              {canScrollLeft && (
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-1.5 sm:p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => scroll("left")}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
                </button>
              )}

              {/* Scrollable Content */}
              <div
                ref={sliderRef}
                className="flex overflow-hidden scroll-smooth space-x-2 px-0 sm:px-8 md:px-10"
                style={{
                  paddingLeft: canScrollLeft ? "32px" : "0px",
                  paddingRight: canScrollRight ? "32px" : "0px",
                }}
                onScroll={checkScrollPosition}
              >
                {tags.map((tag) => (
                  <RenderTag
                    key={tag}
                    tag={tag}
                    handleTagChange={handleChangeInTags}
                    isSelected={selectedTags.includes(tag)}
                  />
                ))}
              </div>

              {/* Right Arrow - Only show when can scroll right */}
              {canScrollRight && (
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-md rounded-full p-1.5 sm:p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => scroll("right")}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderTag({ tag, handleTagChange, isSelected }) {
  function handleTagSelection() {
    handleTagChange(tag);
  }

  return (
    <button
      key={tag}
      onClick={handleTagSelection}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
        isSelected
          ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white shadow-sm"
          : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
      }`}
    >
      {tag}
    </button>
  );
}
