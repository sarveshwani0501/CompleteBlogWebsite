// import { useState, useRef, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import tags from "../utils/tags";
// import {
//   Save,
//   Eye,
//   Image,
//   Tag,
//   X,
//   Plus,
//   Check,
//   AlertCircle,
//   ArrowLeft,
// } from "lucide-react";

// export default function CreateBlog() {
//   const [formData, setFormData] = useState({
//     title: "",
//     body: "",
//     coverImage: "",
//     tags: [],
//     author: { name: "Anonymous" }, // You can get this from auth state
//   });
//   const [showPreview, setShowPreview] = useState(false);
//   const [tagInput, setTagInput] = useState("");
//   const [showTagSuggestions, setShowTagSuggestions] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const quillRef = useRef(null);
//   const tagInputRef = useRef(null);
//   const dispatch = useDispatch();

//   // Filter tags based on input and exclude already selected ones
//   const filteredTags = tags.filter(
//     (tag) =>
//       tag.toLowerCase().includes(tagInput.toLowerCase()) &&
//       !formData.tags.includes(tag)
//   );

//   // React Quill modules configuration
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       ["link", "image", "video"],
//       [{ align: [] }],
//       ["blockquote", "code-block"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "color",
//     "background",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "video",
//     "align",
//     "blockquote",
//     "code-block",
//   ];

//   // Handle form input changes
//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     // Clear specific error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: null,
//       }));
//     }
//   };

//   // Handle tag addition
//   const addTag = (tag) => {
//     if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
//       setFormData((prev) => ({
//         ...prev,
//         tags: [...prev.tags, tag],
//       }));
//       setTagInput("");
//       setShowTagSuggestions(false);
//     }
//   };

//   // Handle tag removal
//   const removeTag = (tagToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       tags: prev.tags.filter((tag) => tag !== tagToRemove),
//     }));
//   };

//   // Handle tag input
//   const handleTagInput = (e) => {
//     const value = e.target.value;
//     setTagInput(value);
//     setShowTagSuggestions(value.length > 0);

//     // Add tag on Enter or comma
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       if (value.trim()) {
//         addTag(value.trim());
//       }
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) {
//       newErrors.title = "Title is required";
//     } else if (formData.title.length < 5) {
//       newErrors.title = "Title must be at least 5 characters";
//     }

//     if (!formData.body.trim() || formData.body === "<p><br></p>") {
//       newErrors.body = "Blog content is required";
//     }

//     if (formData.tags.length === 0) {
//       newErrors.tags = "At least one tag is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       // Dispatch your create blog action here
//       // dispatch(createBlog(formData));

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Reset form after successful submission
//       setFormData({
//         title: "",
//         body: "",
//         coverImage: "",
//         tags: [],
//         author: { name: "Anonymous" },
//       });

//       // Show success message or redirect
//       alert("Blog created successfully!");
//     } catch (error) {
//       console.error("Error creating blog:", error);
//       setErrors({ submit: "Failed to create blog. Please try again." });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Character count for title
//   const titleCharCount = formData.title.length;
//   const maxTitleLength = 100;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-4">
//             <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-200 rounded-full transition-colors">
//               <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-slate-600" />
//             </button>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-900">
//                 Create New Blog
//               </h1>
//               <p className="text-gray-600 dark:text-slate-600">
//                 Share your thoughts and ideas with the community
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <button
//               type="button"
//               onClick={() => setShowPreview(!showPreview)}
//               className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-700 bg-white dark:bg-slate-100 border border-gray-300 dark:border-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors"
//             >
//               <Eye className="h-4 w-4 mr-2" />
//               {showPreview ? "Edit" : "Preview"}
//             </button>
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2">
//               Blog Title *
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => handleInputChange("title", e.target.value)}
//                 placeholder="Enter your blog title..."
//                 maxLength={maxTitleLength}
//                 className={`w-full px-4 py-3 rounded-lg border ${
//                   errors.title
//                     ? "border-red-300 focus:border-red-500 focus:ring-red-500"
//                     : "border-gray-300 dark:border-slate-300 focus:border-blue-500 focus:ring-blue-500"
//                 } focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white dark:bg-slate-100 text-gray-900 dark:text-slate-900 placeholder-gray-500 dark:placeholder-slate-500`}
//               />
//               <div className="absolute right-3 top-3 text-xs text-gray-500 dark:text-slate-500">
//                 {titleCharCount}/{maxTitleLength}
//               </div>
//             </div>
//             {errors.title && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <AlertCircle className="h-4 w-4 mr-1" />
//                 {errors.title}
//               </p>
//             )}
//           </div>

//           {/* Cover Image Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2">
//               Cover Image URL (Optional)
//             </label>
//             <div className="relative">
//               <input
//                 type="url"
//                 value={formData.coverImage}
//                 onChange={(e) =>
//                   handleInputChange("cover", e.target.value)
//                 }
//                 placeholder="https://example.com/image.jpg"
//                 className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-slate-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white dark:bg-slate-100 text-gray-900 dark:text-slate-900 placeholder-gray-500 dark:placeholder-slate-500"
//               />
//               <Image className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-slate-400" />
//             </div>
//             {formData.coverImage && (
//               <div className="mt-2">
//                 <img
//                   src={formData.coverImage}
//                   alt="Cover preview"
//                   className="h-32 w-full object-cover rounded-lg"
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Tags Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2">
//               Tags * (Max 5)
//             </label>

//             {/* Selected Tags */}
//             {formData.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-3">
//                 {formData.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-50 text-blue-800 dark:text-blue-700"
//                   >
//                     {tag}
//                     <button
//                       type="button"
//                       onClick={() => removeTag(tag)}
//                       className="ml-2 h-4 w-4 rounded-full hover:bg-blue-200 dark:hover:bg-blue-100 transition-colors"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}

//             {/* Tag Input */}
//             <div className="relative">
//               <input
//                 ref={tagInputRef}
//                 type="text"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyDown={handleTagInput}
//                 onFocus={() => setShowTagSuggestions(tagInput.length > 0)}
//                 placeholder="Type to search tags or add custom tags..."
//                 disabled={formData.tags.length >= 5}
//                 className={`w-full px-4 py-3 pl-10 rounded-lg border ${
//                   errors.tags
//                     ? "border-red-300 focus:border-red-500 focus:ring-red-500"
//                     : "border-gray-300 dark:border-slate-300 focus:border-blue-500 focus:ring-blue-500"
//                 } focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white dark:bg-slate-100 text-gray-900 dark:text-slate-900 placeholder-gray-500 dark:placeholder-slate-500 disabled:bg-gray-100 dark:disabled:bg-slate-200 disabled:cursor-not-allowed`}
//               />
//               <Tag className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-slate-400" />

//               {/* Tag Suggestions */}
//               {showTagSuggestions && filteredTags.length > 0 && (
//                 <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-100 border border-gray-300 dark:border-slate-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
//                   {filteredTags.slice(0, 10).map((tag) => (
//                     <button
//                       key={tag}
//                       type="button"
//                       onClick={() => addTag(tag)}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors flex items-center justify-between"
//                     >
//                       <span className="text-gray-900 dark:text-slate-900">
//                         {tag}
//                       </span>
//                       <Plus className="h-4 w-4 text-gray-400 dark:text-slate-400" />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {errors.tags && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <AlertCircle className="h-4 w-4 mr-1" />
//                 {errors.tags}
//               </p>
//             )}

//             <p className="mt-1 text-sm text-gray-500 dark:text-slate-500">
//               Press Enter or comma to add tags. Choose from suggested tags or
//               create custom ones.
//             </p>
//           </div>

//           {/* Content Editor */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2">
//               Blog Content *
//             </label>

//             {showPreview ? (
//               <div className="min-h-[400px] p-4 border border-gray-300 dark:border-slate-300 rounded-lg bg-white dark:bg-slate-100">
//                 <div
//                   className="prose max-w-none"
//                   dangerouslySetInnerHTML={{ __html: formData.body }}
//                 />
//               </div>
//             ) : (
//               <div
//                 className={`${errors.body ? "border-red-300" : ""} rounded-lg`}
//               >
//                 <ReactQuill
//                   ref={quillRef}
//                   theme="snow"
//                   value={formData.body}
//                   onChange={(value) => handleInputChange("body", value)}
//                   modules={modules}
//                   formats={formats}
//                   placeholder="Start writing your blog content..."
//                   className="bg-white dark:bg-slate-100"
//                   style={{ minHeight: "400px" }}
//                 />
//               </div>
//             )}

//             {errors.body && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <AlertCircle className="h-4 w-4 mr-1" />
//                 {errors.body}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-slate-200">
//             {errors.submit && (
//               <p className="text-sm text-red-600 flex items-center">
//                 <AlertCircle className="h-4 w-4 mr-1" />
//                 {errors.submit}
//               </p>
//             )}

//             <button
//               type="button"
//               className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-slate-700 bg-white dark:bg-slate-100 border border-gray-300 dark:border-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors"
//             >
//               Save as Draft
//             </button>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Publishing...
//                 </>
//               ) : (
//                 <>
//                   <Save className="h-4 w-4 mr-2" />
//                   Publish Blog
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";
import tags from "../utils/tags";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import { selectUser } from "../features/authSlicer";
import { createBlog, updateBlog, getAllBlogs } from "../features/blogSlicer";
import { selectCurrentBlog } from "../features/blogSlicer";
import { selectUser } from "../features/authSlicer";
import { useEffect } from "react";
import axios from "axios";
// Mock tags array
// const tags = [
//   "JavaScript",
//   "React",
//   "Node.js",
//   "Python",
//   "Web Development",
//   "Frontend",
//   "Backend",
//   "Database",
//   "API",
//   "CSS",
//   "HTML",
//   "Tutorial",
//   "Guide",
//   "Tips",
//   "Best Practices",
//   "Performance",
// ];

// Icons (fallback symbols instead of lucide-react)
const icons = {
  Save: "💾",
  Eye: "👁️",
  Image: "🖼️",
  Tag: "🏷️",
  X: "✕",
  Plus: "+",
  Check: "✓",
  AlertCircle: "⚠️",
  ArrowLeft: "←",
};

export default function CreateBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user?._id;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    blogTitle: "",
    blogBody: "",
    tags: [],
    author: userId,
    _id: "",
  });
  useEffect(() => {
    async function getAllBlog() {
      await dispatch(getAllBlogs([]));
    }
    getAllBlog();
  }, [dispatch]);

  const { slug } = useParams();
  let currBlog = useSelector(selectCurrentBlog);
  const getBlogNow = async () => {
    try {
      console.log(slug);
      const response = await axios.get(
        `http://localhost:8000/api/blogs/slug/${slug}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      // console.log(response.data);
      return response.data.blog;
    } catch (error) {
      const msg = error?.response?.data?.msg;
      console.log(msg);
    }
  };
  useEffect(() => {
    const fetchAndPopulate = async () => {
      if (slug) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/blogs/slug/${slug}`,
            { withCredentials: true }
          );
          const blog = response.data.blog;
          currBlog = blog;
          console.log("Fetched blog", blog);

          setFormData({
            blogTitle: blog.title,
            blogBody: blog.body,
            tags: blog.tags,
            author: blog.author,
            _id: blog._id,
          });
          setIsEditing(true);
        } catch (error) {
          const msg = error?.response?.data?.msg || error.message;
          console.error("Failed to fetch blog:", msg);
        }
      }
    };
    fetchAndPopulate();

    // console.log(currBlog);
  }, [slug, currBlog]);

  const [file, setFile] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tagInputRef = useRef(null);

  const filteredTags = tags?.filter(
    (tag) =>
      tag.toLowerCase().includes(tagInput.toLowerCase()) &&
      !formData?.tags?.includes(tag)
  );

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[field];
        return updatedErrors;
      });
    }
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setTagInput("");
      setShowTagSuggestions(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    setTagInput(value);
    setShowTagSuggestions(value.length > 0);

    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (value.trim()) {
        addTag(value.trim());
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.blogTitle.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.blogTitle.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!formData.blogBody.trim()) {
      newErrors.body = "Blog content is required";
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(formData);
      const newFormData = new FormData();
      newFormData.append("blogTitle", formData.blogTitle);
      newFormData.append("blogBody", formData.blogBody);
      newFormData.append("author", formData.author);
      newFormData.append("tags", formData.tags.join(","));
      if (file) newFormData.append("image", file);

      if (isEditing) {
        newFormData.append("_id", formData._id);
        await dispatch(updateBlog(newFormData)).unwrap();
        setFormData({
          title: "",
          body: "",
          coverImage: "",
          tags: [],
          author: "",
          _id: "",
        });
        navigate(`/${userId}/my-blogs`);
      } else {
        await dispatch(createBlog(newFormData)).unwrap();
        // setFormData({
        //   title: "",
        //   body: "",
        //   coverImage: "",
        //   tags: [],
        //   author: "",
        //   _id: "",
        // });
        navigate("/");
      }

      alert("Blog created successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
      setErrors({ submit: "Failed to create blog. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleCharCount = formData.blogTitle.length;
  const maxTitleLength = 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <span className="text-lg">{icons.ArrowLeft}</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Create New Blog
              </h1>
              <p className="text-muted-foreground">
                Share your thoughts and ideas with the community
              </p>
              <div>
                <MarkdownPreview
                  source={formData.blogBody}
                  style={{ background: "white", color: "black" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Blog Title *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.blogTitle}
                onChange={(e) => handleInputChange("blogTitle", e.target.value)}
                placeholder="Enter your blog title..."
                maxLength={maxTitleLength}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.title
                    ? "border-destructive focus:border-destructive focus:ring-destructive"
                    : "border-border focus:border-primary focus:ring-primary"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-background text-foreground placeholder-muted-foreground`}
              />
              <div className="absolute right-3 top-3 text-xs text-muted-foreground">
                {titleCharCount}/{maxTitleLength}
              </div>
            </div>
            {errors.title && (
              <p className="mt-1 text-sm text-destructive flex items-center">
                <span className="mr-1">{icons.AlertCircle}</span>
                {errors.title}
              </p>
            )}
          </div>

          {/* Cover Image Input */}
          {/* <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cover Image URL (Optional)
            </label>
            <div className="relative">
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) =>
                  handleInputChange("coverImage", e.target.value)
                }
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 pl-10 rounded-lg border border-border focus:border-primary focus:ring-primary focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-background text-foreground placeholder-muted-foreground"
              />
              <span className="absolute left-3 top-3.5 text-muted-foreground">
                {icons.Image}
              </span>
            </div>
            {formData.coverImage && (
              <div className="mt-2">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="h-full w-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div> */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Upload Cover Image URL
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-border focus:border-primary focus:ring-primary focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-background text-foreground placeholder-muted-foreground"
              />
              <span className="absolute left-3 top-3.5 text-muted-foreground">
                {icons.Image}
              </span>
            </div>
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tags * (Max 5)
            </label>

            {/* Selected Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 h-4 w-4 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                      <span className="text-xs">{icons.X}</span>
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Tag Input */}
            <div className="relative z-40">
              <input
                ref={tagInputRef}
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
                onFocus={() => setShowTagSuggestions(tagInput.length > 0)}
                placeholder="Type to search tags or add custom tags..."
                disabled={formData.tags.length >= 5}
                className={`w-full px-4 py-3 pl-10 rounded-lg border ${
                  errors.tags
                    ? "border-destructive focus:border-destructive focus:ring-destructive"
                    : "border-border focus:border-primary focus:ring-primary"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-background text-foreground placeholder-muted-foreground disabled:bg-muted disabled:cursor-not-allowed`}
              />
              <span className="absolute left-3 top-3.5 text-muted-foreground">
                {icons.Tag}
              </span>

              {/* Tag Suggestions */}
              {showTagSuggestions && filteredTags.length > 0 && (
                <div className="absolute z-40 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredTags.slice(0, 10).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addTag(tag)}
                      className="w-full px-4 py-2 text-left hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <span className="text-foreground">{tag}</span>
                      <span className="text-muted-foreground">
                        {icons.Plus}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {errors.tags && (
              <p className="mt-1 text-sm text-destructive flex items-center">
                <span className="mr-1">{icons.AlertCircle}</span>
                {errors.tags}
              </p>
            )}

            <p className="mt-1 text-sm text-muted-foreground">
              Press Enter or comma to add tags. Choose from suggested tags or
              create custom ones.
            </p>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Blog Content *
            </label>

            <div
              className="rounded-lg overflow-hidden border border-border"
              data-color-mode="light"
            >
              <MDEditor
                value={formData.blogBody}
                onChange={(value) => handleInputChange("blogBody", value || "")}
                preview="edit"
                height={400}
                data-color-mode="light"
                visibleDragbar={false}
              />
            </div>

            {errors.body && (
              <p className="mt-1 text-sm text-destructive flex items-center">
                <span className="mr-1">{icons.AlertCircle}</span>
                {errors.body}
              </p>
            )}

            <div className="mt-2 text-sm text-muted-foreground">
              <p>
                Use markdown syntax for formatting. The editor supports live
                preview with split view.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
            {errors.submit && (
              <p className="text-sm text-destructive flex items-center">
                <span className="mr-1">{icons.AlertCircle}</span>
                {errors.submit}
              </p>
            )}

            <button
              type="button"
              className="px-6 py-3 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Save as Draft
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 disabled:bg-primary/50 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <span className="mr-2">{icons.Save}</span>
                  Publish Blog
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
