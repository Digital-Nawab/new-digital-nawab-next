// import { useState, useRef, useEffect } from "react";
// import { useForm, usePage, router } from "@inertiajs/react";
// import {
//     Plus,
//     Edit,
//     Trash2,
//     X,
//     Upload,
//     Calendar,
//     Tag,
//     User,
//     Eye,
// } from "lucide-react";
// import Layout from "@/Layouts/Layout";

// // Quill Rich Text Editor Component
// const QuillEditor = ({ value, onChange, placeholder = "Start writing..." }) => {
//     const editorRef = useRef(null);
//     const quillRef = useRef(null);

//     useEffect(() => {
//         // Load Quill CSS and JS
//         if (!document.querySelector('#quill-css')) {
//             const link = document.createElement('link');
//             link.id = 'quill-css';
//             link.rel = 'stylesheet';
//             link.href = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css';
//             document.head.appendChild(link);
//         }

//         if (!window.Quill) {
//             const script = document.createElement('script');
//             script.src = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js';
//             script.onload = initializeQuill;
//             document.head.appendChild(script);
//         } else {
//             initializeQuill();
//         }

//         return () => {
//             if (quillRef.current) {
//                 quillRef.current = null;
//             }
//         };
//     }, []);

//     const initializeQuill = () => {
//         if (window.Quill && editorRef.current && !quillRef.current) {
//             quillRef.current = new window.Quill(editorRef.current, {
//                 theme: 'snow',
//                 placeholder: placeholder,
//                 modules: {
//                     toolbar: [
//                         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//                         [{ 'font': [] }],
//                         [{ 'size': ['small', false, 'large', 'huge'] }],
//                         ['bold', 'italic', 'underline', 'strike'],
//                         [{ 'color': [] }, { 'background': [] }],
//                         [{ 'script': 'sub'}, { 'script': 'super' }],
//                         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//                         [{ 'indent': '-1'}, { 'indent': '+1' }],
//                         [{ 'direction': 'rtl' }],
//                         [{ 'align': [] }],
//                         ['link', 'image', 'video'],
//                         ['blockquote', 'code-block'],
//                         ['clean']
//                     ]
//                 }
//             });

//             // Set initial content
//             if (value) {
//                 quillRef.current.root.innerHTML = value;
//             }

//             // Listen for content changes
//             quillRef.current.on('text-change', () => {
//                 const html = quillRef.current.root.innerHTML;
//                 onChange(html);
//             });
//         }
//     };

//     useEffect(() => {
//         if (quillRef.current && value !== quillRef.current.root.innerHTML) {
//             quillRef.current.root.innerHTML = value || '';
//         }
//     }, [value]);

//     return (
//         <div className="quill-wrapper">
//             <div ref={editorRef} style={{ minHeight: '200px' }} />
//         </div>
//     );
// };

// const Blog = () => {
//     const { blogs, flash } = usePage().props;
//     const [editingBlog, setEditingBlog] = useState(null);
//     const [alertMessage, setAlertMessage] = useState("");
//     const [alertType, setAlertType] = useState("");
//     const [cardImagePreview, setCardImagePreview] = useState("");
//     const [bannerImagePreview, setBannerImagePreview] = useState("");

//     const cardImageRef = useRef(null);
//     const bannerImageRef = useRef(null);

//     // Single form for both create and edit
//     const form = useForm({
//         meta_key: "",
//         meta_desc: "",
//         title: "",
//         url: "",
//         keyword: [""],
//         description: "",
//         author: "",
//         published: "",
//         card_img: null,
//         banner_img: null,
//     });

//     const showAlert = (message, type = "success") => {
//         setAlertMessage(message);
//         setAlertType(type);
//         setTimeout(() => {
//             setAlertMessage("");
//             setAlertType("");
//         }, 4000);
//     };

//     const resetForm = () => {
//         form.reset();
//         form.setData({
//             meta_key: "",
//             meta_desc: "",
//             title: "",
//             url: "",
//             keyword: [""],
//             description: "",
//             author: "",
//             published: "",
//             card_img: null,
//             banner_img: null,
//         });
//         form.clearErrors();
//         setEditingBlog(null);
//         setCardImagePreview("");
//         setBannerImagePreview("");
//         if (cardImageRef.current) cardImageRef.current.value = "";
//         if (bannerImageRef.current) bannerImageRef.current.value = "";
//     };

//     const handleEdit = (blog) => {
//         setEditingBlog(blog);
//         form.setData({
//             meta_key: blog.meta_key,
//             meta_desc: blog.meta_desc,
//             title: blog.title,
//             url: blog.url,
//             keyword: blog.keyword,
//             description: blog.description,
//             author: blog.author,
//             published: blog.published.split("T")[0], // Format date for input
//             card_img: null,
//             banner_img: null,
//         });
//         form.clearErrors();
//         setCardImagePreview(`/assets/images/blog/${blog.card_img}`);
//         setBannerImagePreview(`/assets/images/blog/${blog.banner_img}`);

//         // Scroll to form
//         document
//             .getElementById("blogForm")
//             .scrollIntoView({ behavior: "smooth" });
//     };

//     const handleImageChange = (e, type) => {
//         const file = e.target.files[0];
//         if (file) {
//             form.setData({
//                 ...form.data,
//                 [type]: file,
//             });

//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 if (type === "card_img") {
//                     setCardImagePreview(e.target.result);
//                 } else {
//                     setBannerImagePreview(e.target.result);
//                 }
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = () => {
//         const cleanedData = {
//             ...form.data,
//             keyword: form.data.keyword.filter((k) => k?.trim()),
//         };

//         if (editingBlog) {
//             // Update existing blog
//             form.post(route("blogs.update", editingBlog.id), {
//                 data: cleanedData,
//                 forceFormData: true,
//                 _method: "PUT",
//                 onSuccess: () => {
//                     resetForm();
//                     showAlert("Blog updated successfully!");
//                 },
//                 onError: (errors) => {
//                     showAlert(
//                         "Failed to update blog. Please check the form.",
//                         "error"
//                     );
//                 },
//             });
//         } else {
//             // Create new blog
//             form.post(route("blogs.store"), {
//                 data: cleanedData,
//                 forceFormData: true,
//                 onSuccess: () => {
//                     resetForm();
//                     showAlert("Blog created successfully!");
//                 },
//                 onError: (errors) => {
//                     showAlert(
//                         "Failed to create blog. Please check the form.",
//                         "error"
//                     );
//                 },
//             });
//         }
//     };

//     const handleDelete = (id) => {
//         router.delete(route("blogs.destroy", id), {
//             onSuccess: () => {
//                 showAlert("Blog deleted successfully!");
//             },
//             onError: (errors) => {
//                 showAlert("Failed to delete blog.", "error");
//             },
//         });
//     };

//     return (
//         <Layout>
//             <div className="p-6 mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-3xl font-bold text-gray-900">
//                         Blog Management
//                     </h1>
//                     <a href="#blogForm">
//                         <button
//                             onClick={() => resetForm()}
//                             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                         >
//                             <Plus className="w-4 h-4" />
//                             Add Blog
//                         </button>
//                     </a>
//                 </div>

//                 {/* Alert Box */}
//                 {alertMessage && (
//                     <div
//                         className={`mb-4 p-4 rounded-lg ${
//                             alertType === "success"
//                                 ? "bg-green-100 border border-green-400 text-green-700"
//                                 : "bg-red-100 border border-red-400 text-red-700"
//                         }`}
//                     >
//                         {alertMessage}
//                     </div>
//                 )}

//                 {/* Flash Messages */}
//                 {flash?.message && (
//                     <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
//                         {flash.message}
//                     </div>
//                 )}

//                 {/* Blogs Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                     {blogs && blogs.length === 0 ? (
//                         <div className="col-span-full text-center py-12">
//                             <div className="text-gray-500">
//                                 <div className="text-lg mb-2">
//                                     No blogs found
//                                 </div>
//                                 <div className="text-sm">
//                                     Click "Add Blog" to create your first blog
//                                     post
//                                 </div>
//                             </div>
//                         </div>
//                     ) : (
//                         blogs?.map((blog) => (
//                             <div
//                                 key={blog.id}
//                                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                             >
//                                 <div className="relative">
//                                     <img
//                                         src={`${blog.card_img}`}
//                                         alt={blog.title}
//                                         className="w-full h-48 object-cover"
//                                     />
//                                     <div className="absolute top-2 right-2 flex gap-2">
//                                         <button
//                                             onClick={() => handleEdit(blog)}
//                                             className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//                                             title="Edit Blog"
//                                         >
//                                             <Edit className="w-4 h-4" />
//                                         </button>
//                                         <button
//                                             onClick={() =>
//                                                 handleDelete(blog.id)
//                                             }
//                                             className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
//                                             title="Delete Blog"
//                                         >
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="p-4">
//                                     <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
//                                         {blog.title}
//                                     </h3>
//                                     <div 
//                                         className="text-gray-600 text-sm mb-3 line-clamp-3"
//                                         dangerouslySetInnerHTML={{ __html: blog.description }}
//                                     />

//                                     <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
//                                         <div className="flex items-center gap-1">
//                                             <User className="w-3 h-3" />
//                                             {blog.author}
//                                         </div>
//                                         <div className="flex items-center gap-1">
//                                             <Calendar className="w-3 h-3" />
//                                             {new Date(
//                                                 blog.published
//                                             ).toLocaleDateString()}
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-wrap gap-1">
//                                         {blog.keyword
//                                             .slice(0, 3)
//                                             .map((keyword, index) => (
//                                                 <span
//                                                     key={index}
//                                                     className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
//                                                 >
//                                                     {keyword}
//                                                 </span>
//                                             ))}
//                                         {blog.keyword.length > 3 && (
//                                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
//                                                 +{blog.keyword.length - 3} more
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>

//                 {/* Blog Form */}
//                 <div
//                     id="blogForm"
//                     className="bg-white rounded-xl shadow-lg border border-gray-200"
//                 >
//                     <div className="p-8">
//                         <div className="flex justify-between items-center mb-6">
//                             <div>
//                                 <h2 className="text-2xl font-bold text-gray-900">
//                                     {editingBlog ? "Edit Blog" : "Add New Blog"}
//                                 </h2>
//                                 <p className="text-gray-600 mt-1">
//                                     {editingBlog
//                                         ? "Update the blog post details"
//                                         : "Create a new blog post for your website"}
//                                 </p>
//                             </div>
//                             {editingBlog && (
//                                 <button
//                                     onClick={resetForm}
//                                     className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//                                     title="Cancel Edit"
//                                 >
//                                     <X className="w-4 h-4" />
//                                     Cancel
//                                 </button>
//                             )}
//                         </div>

//                         {/* Display Form Errors */}
//                         {Object.keys(form.errors).length > 0 && (
//                             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                                 <h3 className="text-sm font-medium text-red-800 mb-2">
//                                     Please fix the following errors:
//                                 </h3>
//                                 <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
//                                     {Object.values(form.errors).map(
//                                         (error, index) => (
//                                             <li key={index}>{error}</li>
//                                         )
//                                     )}
//                                 </ul>
//                             </div>
//                         )}

//                         {/* Form Fields */}
//                         <div className="space-y-6">
//                             {/* Meta Information */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Meta Title *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={form.data.meta_key}
//                                         onChange={(e) =>
//                                             form.setData(
//                                                 "meta_key",
//                                                 e.target.value
//                                             )
//                                         }
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                         placeholder="SEO meta title"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Blog URL *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={form.data.url}
//                                         onChange={(e) =>
//                                             form.setData("url", e.target.value)
//                                         }
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                         placeholder="blog-url-slug"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Meta Description *
//                                 </label>
//                                 <textarea
//                                     value={form.data.meta_desc}
//                                     onChange={(e) =>
//                                         form.setData(
//                                             "meta_desc",
//                                             e.target.value
//                                         )
//                                     }
//                                     rows={2}
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//                                     placeholder="SEO meta description"
//                                 />
//                             </div>

//                             {/* Blog Content */}
//                             <div>
//                                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Blog Title *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={form.data.title}
//                                     onChange={(e) =>
//                                         form.setData("title", e.target.value)
//                                     }
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     placeholder="Your amazing blog title"
//                                 />
//                             </div>

//                             {/* Quill Rich Text Editor for Blog Description */}
//                             <div>
//                                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Blog Description *
//                                 </label>
//                                 <QuillEditor
//                                     value={form.data.description}
//                                     onChange={(content) => form.setData("description", content)}
//                                     placeholder="Write a compelling description of your blog post..."
//                                 />
//                                 {form.errors.description && (
//                                     <p className="text-sm text-red-600 mt-1">{form.errors.description}</p>
//                                 )}
//                             </div>

//                             {/* Author and Date */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Author *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={form.data.author}
//                                         onChange={(e) =>
//                                             form.setData(
//                                                 "author",
//                                                 e.target.value
//                                             )
//                                         }
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                         placeholder="Author name"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Published Date *
//                                     </label>
//                                     <input
//                                         type="date"
//                                         value={form.data.published}
//                                         onChange={(e) =>
//                                             form.setData(
//                                                 "published",
//                                                 e.target.value
//                                             )
//                                         }
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Keywords */}
//                             <SingleInputArray
//                                 form={form}
//                                 field="keyword"
//                                 label="Keywords *"
//                                 placeholder="Add a keyword"
//                             />

//                             {/* Images */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Card Image * (400x400)
//                                     </label>
//                                     <div className="space-y-3">
//                                         <input
//                                             ref={cardImageRef}
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) =>
//                                                 handleImageChange(e, "card_img")
//                                             }
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                         />
//                                         {cardImagePreview && (
//                                             <div className="relative">
//                                                 <img
//                                                     src={cardImagePreview}
//                                                     alt="Card preview"
//                                                     className="w-full h-32 object-cover rounded-lg border"
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Banner Image * (1200x600)
//                                     </label>
//                                     <div className="space-y-3">
//                                         <input
//                                             ref={bannerImageRef}
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) =>
//                                                 handleImageChange(
//                                                     e,
//                                                     "banner_img"
//                                                 )
//                                             }
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                         />
//                                         {bannerImagePreview && (
//                                             <div className="relative">
//                                                 <img
//                                                     src={bannerImagePreview}
//                                                     alt="Banner preview"
//                                                     className="w-full h-32 object-cover rounded-lg border"
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Form Actions */}
//                         <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
//                             <button
//                                 onClick={resetForm}
//                                 disabled={form.processing}
//                                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
//                             >
//                                 {editingBlog ? "Cancel" : "Reset"}
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={form.processing}
//                                 className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {form.processing
//                                     ? editingBlog
//                                         ? "Updating..."
//                                         : "Creating..."
//                                     : editingBlog
//                                     ? "Update Blog"
//                                     : "Create Blog"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default Blog;

// // Enhanced SingleInputArray component for keywords
// const SingleInputArray = ({ form, field, label, placeholder }) => {
//     const [tempValue, setTempValue] = useState("");

//     const handleAdd = () => {
//         if (tempValue?.trim() !== "") {
//             form.setData({
//                 ...form.data,
//                 [field]: [...form.data[field], tempValue?.trim()],
//             });
//             setTempValue("");
//         }
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             handleAdd();
//         }
//     };

//     const handleRemove = (index) => {
//         const updated = form.data[field].filter((_, i) => i !== index);
//         form.setData({
//             ...form.data,
//             [field]: updated,
//         });
//     };

//     return (
//         <div className="space-y-3">
//             <label className="block text-sm font-semibold text-gray-700">
//                 {label}
//             </label>
//             <div className="flex gap-3">
//                 <input
//                     type="text"
//                     value={tempValue}
//                     onChange={(e) => setTempValue(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder={placeholder}
//                     className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <button
//                     type="button"
//                     onClick={handleAdd}
//                     className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
//                 >
//                     Add
//                 </button>
//             </div>

//             {/* Show added items */}
//             <div className="space-y-2">
//                 {form.data[field].map(
//                     (item, index) =>
//                         item?.trim() && (
//                             <div
//                                 key={index}
//                                 className="flex justify-between items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
//                             >
//                                 <span className="text-gray-800 flex-1 flex items-center gap-2">
//                                     <Tag className="w-4 h-4 text-gray-500" />
//                                     {item}
//                                 </span>
//                                 <button
//                                     type="button"
//                                     onClick={() => handleRemove(index)}
//                                     className="text-red-600 hover:text-red-800 transition-colors font-medium"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         )
//                 )}
//             </div>

//             {form.errors[field] && (
//                 <p className="text-sm text-red-600">{form.errors[field]}</p>
//             )}
//         </div>
//     );
// };






import { useState, useRef, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import {
    Plus,
    Edit,
    Trash2,
    X,
    Calendar,
    Tag,
    User,
    AlertTriangle,
} from "lucide-react";
import Layout from "@/Layouts/Layout";

// Quill Rich Text Editor Component
const QuillEditor = ({ value, onChange, placeholder = "Start writing..." }) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        // Load Quill CSS and JS
        if (!document.querySelector('#quill-css')) {
            const link = document.createElement('link');
            link.id = 'quill-css';
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css';
            document.head.appendChild(link);
        }

        if (!window.Quill) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js';
            script.onload = initializeQuill;
            document.head.appendChild(script);
        } else {
            initializeQuill();
        }

        return () => {
            if (quillRef.current) {
                quillRef.current = null;
            }
        };
    }, []);

    const initializeQuill = () => {
        if (window.Quill && editorRef.current && !quillRef.current) {
            quillRef.current = new window.Quill(editorRef.current, {
                theme: 'snow',
                placeholder: placeholder,
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'font': [] }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'indent': '-1'}, { 'indent': '+1' }],
                        [{ 'direction': 'rtl' }],
                        [{ 'align': [] }],
                        ['link', 'image', 'video'],
                        ['blockquote', 'code-block'],
                        ['clean']
                    ]
                }
            });

            // Set initial content
            if (value) {
                quillRef.current.root.innerHTML = value;
            }

            // Listen for content changes
            quillRef.current.on('text-change', () => {
                const html = quillRef.current.root.innerHTML;
                onChange(html);
            });
        }
    };

    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value || '';
        }
    }, [value]);

    return (
        <div className="quill-wrapper">
            <div ref={editorRef} style={{ minHeight: '200px' }} />
        </div>
    );
};

// Converts a blog title into a URL-friendly slug
// e.g. "My Awesome Blog Post!" -> "my-awesome-blog-post"
const slugify = (text) => {
    return (text || "")
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // remove special characters
        .replace(/\s+/g, "-")          // spaces to hyphens
        .replace(/-+/g, "-")           // collapse multiple hyphens
        .replace(/^-+|-+$/g, "");      // trim leading/trailing hyphens
};

const Blog = () => {
    const { blogs, flash } = usePage().props;
    const [editingBlog, setEditingBlog] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [cardImagePreview, setCardImagePreview] = useState("");
    const [bannerImagePreview, setBannerImagePreview] = useState("");

    // NEW: controls whether the form is visible at all
    const [showForm, setShowForm] = useState(false);

    // NEW: controls the delete confirmation modal
    const [deleteTarget, setDeleteTarget] = useState(null);

    const cardImageRef = useRef(null);
    const bannerImageRef = useRef(null);

    // Single form for both create and edit
    const form = useForm({
        meta_key: "",
        meta_desc: "",
        title: "",
        url: "",
        keyword: [""],
        description: "",
        author: "",
        published: "",
        card_img: null,
        banner_img: null,
    });

    // NEW: tracks whatever is currently typed in the keyword "add" box,
    // lifted up so a typed-but-not-"Added" keyword isn't silently dropped
    const [tempKeyword, setTempKeyword] = useState("");

    // NEW: tracks whether the URL/slug has been manually edited by the user.
    // Once true, typing in the title field stops auto-regenerating the URL.
    // This applies both when creating a new blog and when editing an
    // existing one — title changes keep the slug in sync unless the user
    // manually types into the URL field themselves.
    const [urlEdited, setUrlEdited] = useState(false);

    const showAlert = (message, type = "success") => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage("");
            setAlertType("");
        }, 4000);
    };

    const resetForm = () => {
        form.reset();
        form.setData({
            meta_key: "",
            meta_desc: "",
            title: "",
            url: "",
            keyword: [""],
            description: "",
            author: "",
            published: "",
            card_img: null,
            banner_img: null,
        });
        form.clearErrors();
        setEditingBlog(null);
        setCardImagePreview("");
        setBannerImagePreview("");
        setTempKeyword("");
        setUrlEdited(false);
        if (cardImageRef.current) cardImageRef.current.value = "";
        if (bannerImageRef.current) bannerImageRef.current.value = "";
    };

    // Open form fresh for "Add Blog"
    const handleAddNew = () => {
        resetForm();
        setShowForm(true);
        setTimeout(() => {
            document.getElementById("blogForm")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    };

    // Open form pre-filled for editing
    const handleEdit = (blog) => {
        setEditingBlog(blog);
        form.setData({
            meta_key: blog.meta_key,
            meta_desc: blog.meta_desc,
            title: blog.title,
            url: blog.url,
            keyword: blog.keyword?.length ? blog.keyword : [""],
            description: blog.description,
            author: blog.author,
            published: blog.published.split("T")[0], // Format date for input
            card_img: null,
            banner_img: null,
        });
        form.clearErrors();
        setTempKeyword("");
        setUrlEdited(false); // let title edits regenerate the URL here too, until user manually edits URL

        // card_img / banner_img are already stored as full relative paths
        // (e.g. "assets/images/blog/card_xxx.webp"), so just prefix with a
        // leading slash — don't prepend the folder again or the path breaks
        setCardImagePreview(blog.card_img ? `/${blog.card_img}` : "");
        setBannerImagePreview(blog.banner_img ? `/${blog.banner_img}` : "");

        setShowForm(true);

        setTimeout(() => {
            document.getElementById("blogForm")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
    };

    // Close/hide the form entirely (used by Cancel)
    const handleCloseForm = () => {
        resetForm();
        setShowForm(false);
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            form.setData({
                ...form.data,
                [type]: file,
            });

            const reader = new FileReader();
            reader.onload = (e) => {
                if (type === "card_img") {
                    setCardImagePreview(e.target.result);
                } else {
                    setBannerImagePreview(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        // Merge in any keyword still sitting in the "add" box that the user
        // typed but never clicked "Add" for, so it isn't silently dropped
        const mergedKeywords = [...form.data.keyword, tempKeyword]
            .map((k) => (k || "").trim())
            .filter(Boolean);

        // IMPORTANT: useForm's post()/put() do NOT accept a `data` override
        // option. form.transform() is the correct Inertia API to modify the
        // payload right before send.
        //
        // IMPORTANT #2: PHP has a long-standing limitation where it cannot
        // parse multipart/form-data request bodies on PUT/PATCH/DELETE
        // requests (only POST). Since this form can include file uploads
        // (card_img/banner_img), submitting an update via form.put() with a
        // file attached sends a multipart PUT request that Laravel receives
        // as EMPTY — which is exactly why every field showed as "required"
        // even though it was filled in. The fix (and Inertia's official
        // recommendation) is to always send file-capable updates via POST,
        // with a `_method` field so Laravel's method-spoofing routes it to
        // the PUT handler correctly.
        form.transform((data) => ({
            ...data,
            keyword: mergedKeywords,
            ...(editingBlog ? { _method: "put" } : {}),
        }));

        if (editingBlog) {
            // Update existing blog — POST + _method spoofing (see note above)
            form.post(route("blogs.update", editingBlog.id), {
                onSuccess: () => {
                    handleCloseForm();
                    showAlert("Blog updated successfully!");
                },
                onError: () => {
                    showAlert(
                        "Failed to update blog. Please check the form.",
                        "error"
                    );
                },
            });
        } else {
            // Create new blog
            form.post(route("blogs.store"), {
                onSuccess: () => {
                    handleCloseForm();
                    showAlert("Blog created successfully!");
                },
                onError: () => {
                    showAlert(
                        "Failed to create blog. Please check the form.",
                        "error"
                    );
                },
            });
        }
    };

    // NEW: just opens the confirmation modal
    const requestDelete = (blog) => {
        setDeleteTarget(blog);
    };

    // NEW: actually deletes after confirmation
    const confirmDelete = () => {
        if (!deleteTarget) return;

        router.delete(route("blogs.destroy", deleteTarget.id), {
            onSuccess: () => {
                showAlert("Blog deleted successfully!");
                setDeleteTarget(null);
            },
            onError: () => {
                showAlert("Failed to delete blog.", "error");
                setDeleteTarget(null);
            },
        });
    };

    const cancelDelete = () => {
        setDeleteTarget(null);
    };

    return (
        <Layout>
            <div className="p-6 mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Blog Management
                    </h1>
                    {/* Add button only opens the form now */}
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Blog
                    </button>
                </div>

                {/* Alert Box */}
                {alertMessage && (
                    <div
                        className={`mb-4 p-4 rounded-lg ${
                            alertType === "success"
                                ? "bg-green-100 border border-green-400 text-green-700"
                                : "bg-red-100 border border-red-400 text-red-700"
                        }`}
                    >
                        {alertMessage}
                    </div>
                )}

                {/* Flash Messages */}
                {flash?.message && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {flash.message}
                    </div>
                )}

                {/* Blogs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {blogs && blogs.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <div className="text-gray-500">
                                <div className="text-lg mb-2">
                                    No blogs found
                                </div>
                                <div className="text-sm">
                                    Click "Add Blog" to create your first blog
                                    post
                                </div>
                            </div>
                        </div>
                    ) : (
                        blogs?.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="relative">
                                    <img
                                        src={`/${blog.card_img}`}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                                            title="Edit Blog"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => requestDelete(blog)}
                                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                            title="Delete Blog"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <div
                                        className="text-gray-600 text-sm mb-3 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: blog.description }}
                                    />

                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {blog.author}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(
                                                blog.published
                                            ).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {blog.keyword
                                            .slice(0, 3)
                                            .map((keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                        {blog.keyword.length > 3 && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                +{blog.keyword.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Blog Form - only rendered when showForm is true */}
                {showForm && (
                    <div
                        id="blogForm"
                        className="bg-white rounded-xl shadow-lg border border-gray-200"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingBlog ? "Edit Blog" : "Add New Blog"}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        {editingBlog
                                            ? "Update the blog post details"
                                            : "Create a new blog post for your website"}
                                    </p>
                                </div>
                                <button
                                    onClick={handleCloseForm}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                    title="Close Form"
                                >
                                    <X className="w-4 h-4" />
                                    Close
                                </button>
                            </div>

                            {/* Display Form Errors */}
                            {Object.keys(form.errors).length > 0 && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <h3 className="text-sm font-medium text-red-800 mb-2">
                                        Please fix the following errors:
                                    </h3>
                                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                                        {Object.values(form.errors).map(
                                            (error, index) => (
                                                <li key={index}>{error}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Form Fields */}
                            <div className="space-y-6">
                                {/* Meta Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Meta Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.meta_key}
                                            onChange={(e) =>
                                                form.setData(
                                                    "meta_key",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="SEO meta title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Blog URL *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.url}
                                            readOnly
                                            onChange={(e) => {
                                                setUrlEdited(true); // user is taking manual control of the slug
                                                form.setData("url", e.target.value);
                                            }}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="blog-url-slug"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Auto-filled from the title — edit manually if you want a custom URL.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Meta Description *
                                    </label>
                                    <textarea
                                        value={form.data.meta_desc}
                                        onChange={(e) =>
                                            form.setData(
                                                "meta_desc",
                                                e.target.value
                                            )
                                        }
                                        rows={2}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                        placeholder="SEO meta description"
                                    />
                                </div>

                                {/* Blog Content */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Blog Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.title}
                                        onChange={(e) => {
                                            const newTitle = e.target.value;
                                            form.setData("title", newTitle);
                                            // Auto-generate the URL/slug from the title as the
                                            // user types, but only when creating a fresh blog
                                            // and the URL hasn't been manually touched yet
                                            if (!urlEdited) {
                                                form.setData("url", slugify(newTitle));
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Your amazing blog title"
                                    />
                                </div>

                                {/* Quill Rich Text Editor for Blog Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Blog Description *
                                    </label>
                                    <QuillEditor
                                        value={form.data.description}
                                        onChange={(content) => form.setData("description", content)}
                                        placeholder="Write a compelling description of your blog post..."
                                    />
                                    {form.errors.description && (
                                        <p className="text-sm text-red-600 mt-1">{form.errors.description}</p>
                                    )}
                                </div>

                                {/* Author and Date */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Author *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.author}
                                            onChange={(e) =>
                                                form.setData(
                                                    "author",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Author name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Published Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={form.data.published}
                                            onChange={(e) =>
                                                form.setData(
                                                    "published",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Keywords */}
                                <SingleInputArray
                                    form={form}
                                    field="keyword"
                                    label="Keywords *"
                                    placeholder="Add a keyword"
                                    tempValue={tempKeyword}
                                    setTempValue={setTempKeyword}
                                />

                                {/* Images */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Card Image {editingBlog ? "" : "*"} (400x400)
                                        </label>
                                        <div className="space-y-3">
                                            <input
                                                ref={cardImageRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleImageChange(e, "card_img")
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                            {cardImagePreview && (
                                                <div className="relative">
                                                    <img
                                                        src={cardImagePreview}
                                                        alt="Card preview"
                                                        className="w-full h-32 object-cover rounded-lg border"
                                                    />
                                                </div>
                                            )}
                                            {form.errors.card_img && (
                                                <p className="text-sm text-red-600">{form.errors.card_img}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Banner Image {editingBlog ? "" : "*"} (1200x600)
                                        </label>
                                        <div className="space-y-3">
                                            <input
                                                ref={bannerImageRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleImageChange(
                                                        e,
                                                        "banner_img"
                                                    )
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                            {bannerImagePreview && (
                                                <div className="relative">
                                                    <img
                                                        src={bannerImagePreview}
                                                        alt="Banner preview"
                                                        className="w-full h-32 object-cover rounded-lg border"
                                                    />
                                                </div>
                                            )}
                                            {form.errors.banner_img && (
                                                <p className="text-sm text-red-600">{form.errors.banner_img}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleCloseForm}
                                    disabled={form.processing}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={form.processing}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {form.processing
                                        ? editingBlog
                                            ? "Updating..."
                                            : "Creating..."
                                        : editingBlog
                                        ? "Update Blog"
                                        : "Create Blog"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteTarget && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Delete Blog?
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Are you sure you want to delete
                                        {deleteTarget.title ? ` "${deleteTarget.title}"` : ` this blog`}?
                                        This action cannot be undone and will also remove its images.
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Blog;

// Enhanced SingleInputArray component for keywords
const SingleInputArray = ({ form, field, label, placeholder, tempValue, setTempValue }) => {
    const handleAdd = () => {
        if (tempValue?.trim() !== "") {
            form.setData({
                ...form.data,
                [field]: [...form.data[field], tempValue?.trim()],
            });
            setTempValue("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleRemove = (index) => {
        const updated = form.data[field].filter((_, i) => i !== index);
        form.setData({
            ...form.data,
            [field]: updated,
        });
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
                {label}
            </label>
            <div className="flex gap-3">
                <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                    Add
                </button>
            </div>

            {/* Show added items */}
            <div className="space-y-2">
                {form.data[field].map(
                    (item, index) =>
                        item?.trim() && (
                            <div
                                key={index}
                                className="flex justify-between items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                            >
                                <span className="text-gray-800 flex-1 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-gray-500" />
                                    {item}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="text-red-600 hover:text-red-800 transition-colors font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        )
                )}
            </div>

            {form.errors[field] && (
                <p className="text-sm text-red-600">{form.errors[field]}</p>
            )}
        </div>
    );
};