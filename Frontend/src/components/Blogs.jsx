// import { useState, useEffect } from "react";
// import tags from "../utils/tags";
// import { getAllBlogs } from "../features/blogSlicer";
// import { useDispatch, useSelector } from "react-redux";
// import { selectAllBlogs } from "../features/blogSlicer";
// import { selectRecentBlogs } from "../features/blogSlicer";

// export default function AllBlogs() {
//   const [selectedTags, setSelectedTags] = useState([]);
//   //const [allBlogs, setAllBlogs] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(
//     function getAllBlog() {
//       dispatch(getAllBlogs(selectedTags));
//       //setAllBlogs(blogs);
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
//     <div className="mx-auto mt-2 mb-6">
//       <BlogTagsFilter handleChangeInTags={handleSelectedTags} />
//       <ul className="flex justify-center flex-col gap-8">
//         {blogs.map((blog) => (
//           <li key={blog.title}>
//             <h1>{blog.title}</h1>
//             <h1>{blog.body}</h1>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function BlogTagsFilter({ handleChangeInTags }) {
//   return (
//     <div className="bg-gray-50/95 dark:bg-white/95 border-b border-gray-200/50 dark:border-slate-200/50 backdrop-blur-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="relative">
//           <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide scroll-smooth">
//             <span className="text-sm font-medium text-gray-700 dark:text-slate-600 whitespace-nowrap mr-2">
//               Filter by:
//             </span>
//             <div className="flex space-x-2 min-w-max">
//               {tags.map((tag) => (
//                 <RenderTag
//                   key={tag}
//                   tag={tag}
//                   handleTagChange={handleChangeInTags}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Gradient fade effects */}
//           <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50/95 dark:from-white/95 to-transparent pointer-events-none"></div>
//           <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50/95 dark:from-white/95 to-transparent pointer-events-none"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function RenderTag({ tag, handleTagChange }) {
//   const [isSelected, setSelected] = useState(false);
//   function handleTagSelection() {
//     handleTagChange(tag);
//     setSelected((isSelected) => !isSelected);
//   }
//   return (
//     <button
//       key={tag}
//       onClick={handleTagSelection}
//       className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
//         isSelected
//           ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-sm"
//           : "bg-gray-200 dark:bg-slate-100 hover:bg-gray-300 dark:hover:bg-slate-200 text-gray-700 dark:text-slate-600 hover:text-gray-900 dark:hover:text-slate-900"
//       }`}
//     >
//       {tag}
//     </button>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import tags from "../utils/tags";
// import { getAllBlogs } from "../features/blogSlicer";
// import { useDispatch, useSelector } from "react-redux";
// import { selectAllBlogs } from "../features/blogSlicer";
// import { selectRecentBlogs } from "../features/blogSlicer";
// import {
//   Calendar,
//   User,
//   Heart,
//   MessageCircle,
//   Tag,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// export default function AllBlogs() {
//   const [selectedTags, setSelectedTags] = useState([]);
//   //const [allBlogs, setAllBlogs] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(
//     function getAllBlog() {
//       dispatch(getAllBlogs(selectedTags));
//       //setAllBlogs(blogs);
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
//       <BlogTagsFilter handleChangeInTags={handleSelectedTags} />

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header Section */}
//         <div className="mb-8">
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
//         <div className="grid gap-6 md:gap-8">
//           {blogs.length === 0 ? (
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
//           ) : (
//             blogs.map((blog) => <BlogCard key={blog.title} blog={blog} />)
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function BlogCard({ blog }) {
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

//   // Truncate body text for preview
//   const truncateText = (text, maxLength = 200) => {
//     if (!text) return "";
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + "...";
//   };

//   return (
//     <article className="bg-white dark:bg-slate-100 rounded-xl shadow-sm border border-gray-200/50 dark:border-slate-200/50 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
//       {/* Cover Image */}
//       {blog.coverImage && blog.coverImage.trim() !== "" && (
//         <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-50 dark:to-purple-50 overflow-hidden">
//           <img
//             src={blog.coverImage}
//             alt={blog.title}
//             className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//           />
//         </div>
//       )}

//       <div className="p-6">
//         {/* Tags */}
//         {blog.tags && blog.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-4">
//             {blog.tags.slice(0, 3).map((tag) => (
//               <span
//                 key={tag}
//                 className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-50 text-blue-800 dark:text-blue-700"
//               >
//                 {tag}
//               </span>
//             ))}
//             {blog.tags.length > 3 && (
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-200 text-gray-600 dark:text-slate-600">
//                 +{blog.tags.length - 3}
//               </span>
//             )}
//           </div>
//         )}

//         {/* Title */}
//         <h2 className="text-xl font-bold text-gray-900 dark:text-slate-900 mb-3 leading-tight hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300 cursor-pointer">
//           {blog.title}
//         </h2>

//         {/* Body Preview */}
//         <div className="prose prose-sm max-w-none mb-4">
//           <p className="text-gray-600 dark:text-slate-600 leading-relaxed">
//             {truncateText(blog.body)}
//           </p>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-200">
//           <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-500">
//             {/* Author */}
//             <div className="flex items-center space-x-1">
//               <User className="h-4 w-4" />
//               <span>{blog.author?.name || "Anonymous"}</span>
//             </div>

//             {/* Date */}
//             <div className="flex items-center space-x-1">
//               <Calendar className="h-4 w-4" />
//               <span>{formatDate(blog.createdAt)}</span>
//             </div>
//           </div>

//           {/* Engagement Stats */}
//           <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-500">
//             {/* Likes */}
//             {blog.likes && (
//               <div className="flex items-center space-x-1">
//                 <Heart className="h-4 w-4" />
//                 <span>{blog.likes.length}</span>
//               </div>
//             )}

//             {/* Comments */}
//             {blog.comments && (
//               <div className="flex items-center space-x-1">
//                 <MessageCircle className="h-4 w-4" />
//                 <span>{blog.comments.length}</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Read More Button */}
//         <div className="mt-4">
//           <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-50 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-100 transition-colors duration-300">
//             Read More
//             <svg
//               className="ml-2 h-4 w-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// function BlogTagsFilter({ handleChangeInTags }) {
//   const sliderRef = useRef(null);

//   const scroll = (direction) => {
//     if (sliderRef.current) {
//       const scrollAmount = 200;
//       sliderRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="sticky top-16 z-40 w-full bg-white/95 dark:bg-slate-100/95 border-b border-gray-200/50 dark:border-slate-200/50 backdrop-blur-sm">
//       <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex items-center space-x-4">
//             <span className="text-sm font-medium text-gray-700 dark:text-slate-600 whitespace-nowrap">
//               Filter by:
//             </span>

//             <div className="relative flex-1">
//               {/* Left Arrow */}
//               <button
//                 className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-100 shadow-md rounded-full p-2 hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors duration-200"
//                 onClick={() => scroll("left")}
//               >
//                 <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-slate-600" />
//               </button>

//               {/* Scrollable Content */}
//               <div
//                 ref={sliderRef}
//                 className="flex overflow-hidden scroll-smooth space-x-2 px-10"
//               >
//                 {tags.map((tag) => (
//                   <RenderTag
//                     key={tag}
//                     tag={tag}
//                     handleTagChange={handleChangeInTags}
//                   />
//                 ))}
//               </div>

//               {/* Right Arrow */}
//               <button
//                 className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-100 shadow-md rounded-full p-2 hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors duration-200"
//                 onClick={() => scroll("right")}
//               >
//                 <ChevronRight className="h-4 w-4 text-gray-600 dark:text-slate-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function RenderTag({ tag, handleTagChange }) {
//   const [isSelected, setSelected] = useState(false);
//   function handleTagSelection() {
//     handleTagChange(tag);
//     setSelected((isSelected) => !isSelected);
//   }
//   return (
//     <button
//       key={tag}
//       onClick={handleTagSelection}
//       className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
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
// import { useDispatch, useSelector } from "react-redux";
// import { selectAllBlogs } from "../features/blogSlicer";
// import { selectRecentBlogs } from "../features/blogSlicer";
// import {
//   Calendar,
//   User,
//   Heart,
//   MessageCircle,
//   Tag,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
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

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header Section */}
//         <div className="mb-8">
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
//         <div className="grid gap-6 md:gap-8">
//           {blogs.length === 0 ? (
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
//           ) : (
//             blogs.map((blog) => <BlogCard key={blog.title} blog={blog} />)
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function BlogCard({ blog }) {
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

//   // Truncate body text for preview
//   const truncateText = (text, maxLength = 200) => {
//     if (!text) return "";
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + "...";
//   };

//   return (
//     <article className="bg-white dark:bg-slate-100 rounded-xl shadow-sm border border-gray-200/50 dark:border-slate-200/50 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
//       {/* Cover Image */}
//       {blog.coverImage && blog.coverImage.trim() !== "" && (
//         <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-50 dark:to-purple-50 overflow-hidden">
//           <img
//             src={blog.coverImage}
//             alt={blog.title}
//             className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//           />
//         </div>
//       )}

//       <div className="p-6">
//         {/* Tags */}
//         {blog.tags && blog.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-4">
//             {blog.tags.slice(0, 3).map((tag) => (
//               <span
//                 key={tag}
//                 className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-50 text-blue-800 dark:text-blue-700"
//               >
//                 {tag}
//               </span>
//             ))}
//             {blog.tags.length > 3 && (
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-200 text-gray-600 dark:text-slate-600">
//                 +{blog.tags.length - 3}
//               </span>
//             )}
//           </div>
//         )}

//         {/* Title */}
//         <h2 className="text-xl font-bold text-gray-900 dark:text-slate-900 mb-3 leading-tight hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300 cursor-pointer">
//           {blog.title}
//         </h2>

//         {/* Body Preview */}
//         <div className="prose prose-sm max-w-none mb-4">
//           <p className="text-gray-600 dark:text-slate-600 leading-relaxed">
//             {truncateText(blog.body)}
//           </p>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-200">
//           <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-500">
//             {/* Author */}
//             <div className="flex items-center space-x-1">
//               <User className="h-4 w-4" />
//               <span>{blog.author?.name || "Anonymous"}</span>
//             </div>

//             {/* Date */}
//             <div className="flex items-center space-x-1">
//               <Calendar className="h-4 w-4" />
//               <span>{formatDate(blog.createdAt)}</span>
//             </div>
//           </div>

//           {/* Engagement Stats */}
//           <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-500">
//             {/* Likes */}
//             {blog.likes && (
//               <div className="flex items-center space-x-1">
//                 <Heart className="h-4 w-4" />
//                 <span>{blog.likes.length}</span>
//               </div>
//             )}

//             {/* Comments */}
//             {blog.comments && (
//               <div className="flex items-center space-x-1">
//                 <MessageCircle className="h-4 w-4" />
//                 <span>{blog.comments.length}</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Read More Button */}
//         <div className="mt-4">
//           <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-50 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-100 transition-colors duration-300">
//             Read More
//             <svg
//               className="ml-2 h-4 w-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </article>
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

  
//   useEffect(() => {
//     checkScrollPosition();

//     const handleResize = () => {
//       checkScrollPosition();
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

  
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
//         <div className="max-w-6xl mx-auto">
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


import { useState, useEffect, useRef } from "react";
import tags from "../utils/tags";
import { getAllBlogs } from "../features/blogSlicer";
import { useDispatch, useSelector } from "react-redux";
import { selectAllBlogs } from "../features/blogSlicer";
import { selectRecentBlogs } from "../features/blogSlicer";
import {
  Calendar,
  User,
  Heart,
  MessageCircle,
  Tag,
  Eye,
  ChevronLeft,
  ChevronRight,
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-50">
      <BlogTagsFilter
        handleChangeInTags={handleSelectedTags}
        selectedTags={selectedTags}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-900 mb-2">
            All Blogs
          </h1>
          <p className="text-gray-600 dark:text-slate-600">
            Discover amazing stories and insights from our community
          </p>
          {selectedTags.length > 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-slate-600">
              <Tag className="h-4 w-4" />
              <span>Filtered by: {selectedTags.join(", ")}</span>
            </div>
          )}
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 dark:bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-gray-400 dark:text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-slate-900 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600 dark:text-slate-600">
                Try adjusting your filters or check back later for new content.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.title} blog={blog} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ blog }) {
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

  // Truncate body text for preview
  const truncateText = (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <article className="bg-white dark:bg-slate-100 rounded-xl shadow-sm border border-gray-200/50 dark:border-slate-200/50 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-fit">
      {/* Cover Image */}
      {blog.coverImage && blog.coverImage.trim() !== "" && (
        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-50 dark:to-purple-50 overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-50 text-blue-800 dark:text-blue-700"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-200 text-gray-600 dark:text-slate-600">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-slate-900 mb-3 leading-tight hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300 cursor-pointer line-clamp-2">
          {blog.title}
        </h2>

        {/* Body Preview */}
        <div className="prose prose-sm max-w-none mb-4">
          <p className="text-gray-600 dark:text-slate-600 leading-relaxed line-clamp-3">
            {truncateText(blog.body, 150)}
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 dark:border-slate-200 gap-3 sm:gap-0">
          <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-slate-500">
            {/* Author */}
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {blog.author?.name || "Anonymous"}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">
                {formatDate(blog.createdAt)}
              </span>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-500">
            {/* Likes */}
            {blog.likes && (
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{blog.likes.length}</span>
              </div>
            )}

            {/* Comments */}
            {blog.comments && (
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{blog.comments.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Read More Button */}
        <div className="mt-4">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-50 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-100 transition-colors duration-300 w-full sm:w-auto justify-center sm:justify-start">
            Read More
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
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
    <div className="sticky top-16 z-40 w-full bg-white/95 dark:bg-slate-100/95 border-b border-gray-200/50 dark:border-slate-200/50 backdrop-blur-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-sm font-medium text-gray-700 dark:text-slate-600 whitespace-nowrap hidden sm:block">
              Filter by:
            </span>

            <div className="relative flex-1 min-w-0">
              {/* Left Arrow - Only show when can scroll left */}
              {canScrollLeft && (
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-100 shadow-md rounded-full p-1.5 sm:p-2 hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors duration-200"
                  onClick={() => scroll("left")}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-slate-600" />
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
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-100 shadow-md rounded-full p-1.5 sm:p-2 hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors duration-200"
                  onClick={() => scroll("right")}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-slate-600" />
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
          ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-sm"
          : "bg-gray-200 dark:bg-slate-200 hover:bg-gray-300 dark:hover:bg-slate-300 text-gray-700 dark:text-slate-600 hover:text-gray-900 dark:hover:text-slate-900"
      }`}
    >
      {tag}
    </button>
  );
}