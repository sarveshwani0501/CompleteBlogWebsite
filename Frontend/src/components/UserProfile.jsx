// import React, { useState } from "react";
// import {
//   User,
//   Mail,
//   Calendar,
//   MapPin,
//   Link,
//   Edit3,
//   Camera,
//   Heart,
//   MessageCircle,
//   BookOpen,
//   Eye,
//   Globe,
//   Twitter,
//   Github,
//   Linkedin,
//   Instagram,
//   Settings,
//   Shield,
//   Bell,
//   Save,
//   X,
// } from "lucide-react";

// import axios from "axios";

// import { selectUser } from "../features/authSlicer";
// import { useSelector } from "react-redux";
// import { selectUserBlogs } from "../features/blogSlicer";
// export default function UserProfile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("about");
//   const user = useSelector(selectUser);
//   const blogs = useSelector((state) => selectUserBlogs(state, user.userName));
//   console.log(blogs);
//   const [editForm, setEditForm] = useState("");
//   let likes = 0,
//     comments = 0,
//     views;
//   for (let i = 0; i < blogs.length; i++) {
//     likes += blogs[i].likes.length;
//     comments += blogs[i].comments.length;
//   }
//   views = likes;
//   const handleSaveProfile = () => {
//     //setUserProfile({ ...editForm });
//     setIsEditing(false);
//   };

//   const [file, setFile] = useState(null);

//   const handleCancelEdit = () => {
//     //setEditForm({ ...userProfile });
//     setIsEditing(false);
//   };
//   const [image, setImage] = useState("");
//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     try {
//       const formData = new FormData();
//       formData.append("image", selectedFile);
//       console.log(selectedFile);
//       console.log("User", user);
//       formData.append("user", JSON.stringify(user));
//       const response = await axios.post(
//         "http://localhost:8000/api/auth/profile-pic",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setFile(null);
//       setImage(response.data.profilePic);
//     } catch (error) {
//       console.log(error?.response?.data?.msg || error.message);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatNumber = (num) => {
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + "M";
//     } else if (num >= 1000) {
//       return (num / 1000).toFixed(1) + "K";
//     }
//     return num.toString();
//   };

//   const tabs = [
//     { id: "about", label: "About", icon: User },
//     { id: "activity", label: "Activity", icon: BookOpen },
//     { id: "settings", label: "Settings", icon: Settings },
//   ];

//   const socialIcons = {
//     twitter: Twitter,
//     github: Github,
//     linkedin: Linkedin,
//     instagram: Instagram,
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-50">
//       {/* Cover Image Section */}
//       <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
//         {user?.coverImage ? (
//           <img
//             src={user?.coverImage}
//             alt="Cover"
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600" />
//         )}

//         <div className="absolute inset-0 bg-black bg-opacity-20" />

//         <button className="absolute top-4 right-4 bg-white/90 dark:bg-slate-100/90 backdrop-blur-sm rounded-full p-2 text-gray-600 dark:text-slate-600 hover:bg-white dark:hover:bg-slate-100 transition-all duration-200 shadow-sm">
//           <Camera className="h-4 w-4" />
//         </button>
//       </div>

//       {/* Profile Header */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="relative -mt-16 md:-mt-20 pb-8">
//           <div className="bg-white dark:bg-slate-100 rounded-2xl shadow-xl border border-gray-200/50 dark:border-slate-200/50 p-6 md:p-8">
//             <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
//               {/* Profile Picture */}
//               <div className="relative">
//                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-100 shadow-lg">
//                   {user?.profilePic ? (
//                     <img
//                       src={user?.profilePic}
//                       alt={user?.userName}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
//                       <User className="h-12 w-12 text-white" />
//                     </div>
//                   )}
//                 </div>
//                 <label
//                   htmlFor="profile-pic"
//                   className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200 cursor-pointer"
//                 >
//                   <Camera className="h-4 w-4" />
//                   <input
//                     id="profile-pic"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                 </label>
//               </div>

//               {/* User Info */}
//               <div className="flex-1">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                   <div>
//                     <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-slate-900 mb-1">
//                       {user?.userName}
//                     </h1>
//                     <p className="text-gray-500 dark:text-slate-500 mb-2">
//                       @{user?.username}
//                     </p>

//                     {/* User Meta */}
//                     <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-slate-600 mb-4">
//                       <div className="flex items-center space-x-1">
//                         <MapPin className="h-4 w-4" />
//                         <span>123</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <Calendar className="h-4 w-4" />
//                         <span>Joined {formatDate(user.createdAt)}</span>
//                       </div>
//                       {/* {userProfile.website && (
//                         <div className="flex items-center space-x-1">
//                           <Globe className="h-4 w-4" />
//                           <a
//                             href={user?.website}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 dark:text-blue-500 hover:underline"
//                           >
//                             Website
//                           </a>
//                         </div>
//                       )} */}
//                     </div>
//                   </div>

//                   {/* Edit Profile Button */}
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm"
//                   >
//                     <Edit3 className="h-4 w-4" />
//                     <span>Edit Profile</span>
//                   </button>
//                 </div>

//                 {/* Bio */}
//                 <p className="text-gray-700 dark:text-slate-700 leading-relaxed max-w-2xl">
//                   bio
//                 </p>
//               </div>
//             </div>

//             {/* Social Links */}
//             {/* <div className="mt-6 flex items-center space-x-4">
//               {Object.entries(userProfile.socialLinks).map(
//                 ([platform, url]) => {
//                   const Icon = socialIcons[platform];
//                   return url ? (
//                     <a
//                       key={platform}
//                       href={url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-gray-600 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
//                     >
//                       <Icon className="h-5 w-5" />
//                     </a>
//                   ) : null;
//                 }
//               )}
//             </div> */}
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
//           <div className="bg-white dark:bg-slate-100 rounded-xl p-4 border border-gray-200/50 dark:border-slate-200/50 text-center">
//             <div className="w-8 h-8 bg-blue-100 dark:bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
//               <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-500" />
//             </div>
//             <div className="text-2xl font-bold text-gray-900 dark:text-slate-900">
//               {formatNumber(blogs?.length)}
//             </div>
//             <div className="text-sm text-gray-500 dark:text-slate-500">
//               Blogs
//             </div>
//           </div>

//           <div className="bg-white dark:bg-slate-100 rounded-xl p-4 border border-gray-200/50 dark:border-slate-200/50 text-center">
//             <div className="w-8 h-8 bg-red-100 dark:bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-2">
//               <Heart className="h-4 w-4 text-red-600 dark:text-red-500" />
//             </div>
//             <div className="text-2xl font-bold text-gray-900 dark:text-slate-900">
//               {formatNumber(likes)}
//             </div>
//             <div className="text-sm text-gray-500 dark:text-slate-500">
//               Likes
//             </div>
//           </div>

//           <div className="bg-white dark:bg-slate-100 rounded-xl p-4 border border-gray-200/50 dark:border-slate-200/50 text-center">
//             <div className="w-8 h-8 bg-green-100 dark:bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-2">
//               <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-500" />
//             </div>
//             <div className="text-2xl font-bold text-gray-900 dark:text-slate-900">
//               {comments}
//             </div>
//             <div className="text-sm text-gray-500 dark:text-slate-500">
//               Comments
//             </div>
//           </div>

//           <div className="bg-white dark:bg-slate-100 rounded-xl p-4 border border-gray-200/50 dark:border-slate-200/50 text-center">
//             <div className="w-8 h-8 bg-purple-100 dark:bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-2">
//               <Eye className="h-4 w-4 text-purple-600 dark:text-purple-500" />
//             </div>
//             <div className="text-2xl font-bold text-gray-900 dark:text-slate-900">
//               {formatNumber(views)}
//             </div>
//             <div className="text-sm text-gray-500 dark:text-slate-500">
//               Views
//             </div>
//           </div>

//           <div className="bg-white dark:bg-slate-100 rounded-xl p-4 border border-gray-200/50 dark:border-slate-200/50 text-center">
//             <div className="w-8 h-8 bg-orange-100 dark:bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-2">
//               <User className="h-4 w-4 text-orange-600 dark:text-orange-500" />
//             </div>
//             <div className="text-2xl font-bold text-gray-900 dark:text-slate-900">
//               {/* {formatNumber(userProfile.stats.followers)} */}45
//             </div>
//             <div className="text-sm text-gray-500 dark:text-slate-500">
//               Followers
//             </div>
//           </div>

//           <div className="bg-white dark:bg-slate-100 rounded-xl p-4 border border-gray-200/50 dark:border-slate-200/50 text-center">
//             <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-2">
//               <User className="h-4 w-4 text-indigo-600 dark:text-indigo-500" />
//             </div>
//             <div className="text-2xl font-bold text-gray-900 dark:text-slate-900">
//               {/* {formatNumber(userProfile.stats.following)} */}
//               21
//             </div>
//             <div className="text-sm text-gray-500 dark:text-slate-500">
//               Following
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white dark:bg-slate-100 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-200/50 overflow-hidden">
//           <div className="border-b border-gray-200 dark:border-slate-200">
//             <nav className="flex space-x-8 px-6">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
//                       activeTab === tab.id
//                         ? "border-blue-500 text-blue-600 dark:text-blue-500"
//                         : "border-transparent text-gray-500 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-700 hover:border-gray-300 dark:hover:border-slate-300"
//                     }`}
//                   >
//                     <Icon className="h-4 w-4" />
//                     <span>{tab.label}</span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {activeTab === "about" && (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-900 mb-3">
//                     About
//                   </h3>
//                   <p className="text-gray-700 dark:text-slate-700 leading-relaxed">
//                     bio
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-900 mb-3">
//                     Contact Information
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center space-x-3">
//                       <Mail className="h-5 w-5 text-gray-400 dark:text-slate-400" />
//                       <span className="text-gray-700 dark:text-slate-700">
//                         {user?.email}
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <MapPin className="h-5 w-5 text-gray-400 dark:text-slate-400" />
//                       <span className="text-gray-700 dark:text-slate-700">
//                         location
//                       </span>
//                     </div>
//                     {/* {userProfile.website && (
//                       <div className="flex items-center space-x-3">
//                         <Link className="h-5 w-5 text-gray-400 dark:text-slate-400" />
//                         <a
//                           href={userProfile.website}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 dark:text-blue-500 hover:underline"
//                         >
//                           {userProfile.website}
//                         </a>
//                       </div>
//                     )} */}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "activity" && (
//               <div className="text-center py-12">
//                 <BookOpen className="h-16 w-16 text-gray-300 dark:text-slate-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-slate-900 mb-2">
//                   Recent Activity
//                 </h3>
//                 <p className="text-gray-500 dark:text-slate-500">
//                   Your recent blog posts and interactions will appear here.
//                 </p>
//               </div>
//             )}

//             {activeTab === "settings" && (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-900 mb-4">
//                     Account Settings
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between py-3">
//                       <div className="flex items-center space-x-3">
//                         <Bell className="h-5 w-5 text-gray-400 dark:text-slate-400" />
//                         <div>
//                           <p className="font-medium text-gray-900 dark:text-slate-900">
//                             Email Notifications
//                           </p>
//                           <p className="text-sm text-gray-500 dark:text-slate-500">
//                             Receive email updates about your account
//                           </p>
//                         </div>
//                       </div>
//                       <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 dark:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                         <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
//                       </button>
//                     </div>

//                     <div className="flex items-center justify-between py-3">
//                       <div className="flex items-center space-x-3">
//                         <Shield className="h-5 w-5 text-gray-400 dark:text-slate-400" />
//                         <div>
//                           <p className="font-medium text-gray-900 dark:text-slate-900">
//                             Privacy Settings
//                           </p>
//                           <p className="text-sm text-gray-500 dark:text-slate-500">
//                             Control who can see your profile
//                           </p>
//                         </div>
//                       </div>
//                       <button className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-600 font-medium">
//                         Configure
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Edit Profile Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-slate-100 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-900">
//                   Edit Profile
//                 </h3>
//                 <button
//                   onClick={handleCancelEdit}
//                   className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-600"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     value={editForm.name}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, name: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-100 text-gray-900 dark:text-slate-900"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2">
//                     Bio
//                   </label>
//                   <textarea
//                     value={editForm.bio}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, bio: e.target.value })
//                     }
//                     rows={4}
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-100 text-gray-900 dark:text-slate-900"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2">
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     value={editForm.location}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, location: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-100 text-gray-900 dark:text-slate-900"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2">
//                     Website
//                   </label>
//                   <input
//                     type="url"
//                     value={editForm.website}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, website: e.target.value })
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 dark:border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-100 text-gray-900 dark:text-slate-900"
//                   />
//                 </div>

//                 <div className="flex justify-end space-x-3 pt-6">
//                   <button
//                     onClick={handleCancelEdit}
//                     className="px-4 py-2 border border-gray-300 dark:border-slate-300 text-gray-700 dark:text-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-200 transition-colors duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSaveProfile}
//                     className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
//                   >
//                     <Save className="h-4 w-4" />
//                     <span>Save Changes</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState } from "react";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Edit3,
  Camera,
  Heart,
  MessageCircle,
  BookOpen,
  Eye,
  Save,
  X,
  Upload,
} from "lucide-react";

import axios from "axios";

import { selectUser } from "../features/authSlicer";
import { useSelector } from "react-redux";
import { selectUserBlogs } from "../features/blogSlicer";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const user = useSelector(selectUser);
  const blogs = useSelector((state) => selectUserBlogs(state, user.userName));

  const [editForm, setEditForm] = useState({
    name: user?.userName || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  });

  let likes = 0,
    comments = 0,
    views;
  for (let i = 0; i < blogs.length; i++) {
    likes += blogs[i].likes.length;
    comments += blogs[i].comments.length;
  }
  views = likes;

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.userName || "",
      bio: user?.bio || "",
      location: user?.location || "",
      website: user?.website || "",
    });
    setIsEditing(false);
  };

  const [image, setImage] = useState("");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log(selectedFile);
      console.log("User", user);
      formData.append("user", JSON.stringify(user));
      const response = await axios.post(
        "http://localhost:8000/api/auth/profile-pic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFile(null);
      setImage(response.data.profilePic);
    } catch (error) {
      console.log(error?.response?.data?.msg || error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const tabs = [
    { id: "about", label: "About", icon: User },
    { id: "activity", label: "Activity", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600" />

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 pb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                  {user?.profilePic || image ? (
                    <img
                      src={user?.profilePic || image}
                      alt={user?.userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <User className="h-12 w-12 text-white" />
                    </div>
                  )}
                </div>

                {/* Profile Picture Upload Button */}
                <div className="absolute bottom-0 right-0">
                  <label
                    htmlFor="profile-pic-upload"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200 cursor-pointer flex items-center justify-center"
                  >
                    {isUploading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </label>
                  <input
                    id="profile-pic-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {user?.userName}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      @{user?.username}
                    </p>

                    {/* User Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {formatDate(user.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Edit Profile Button */}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                {/* Bio */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                  {user?.bio || "No bio available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
              <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(blogs?.length)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Blogs
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(likes)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Likes
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
              <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {comments}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Comments
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(views)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Views
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    About
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {user?.bio || "No bio available"}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Recent Activity
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your recent blog posts and interactions will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Profile
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm({ ...editForm, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
