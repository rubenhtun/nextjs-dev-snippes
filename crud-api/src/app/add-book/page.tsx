// import React, { useState } from "react";

// export default function BookForm({ onSubmit }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     isbn: "",
//     category: "",
//     quantity: "",
//     status: "AVAILABLE",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       !formData.title ||
//       !formData.author ||
//       !formData.isbn ||
//       !formData.category ||
//       !formData.quantity
//     ) {
//       alert("All fields are required!");
//       return;
//     }
//     onSubmit(formData);
//     setFormData({
//       title: "",
//       author: "",
//       isbn: "",
//       category: "",
//       quantity: "",
//       status: "AVAILABLE",
//     });
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//       <h2 className="text-xl font-bold mb-4">Add New Book</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Author
//           </label>
//           <input
//             type="text"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             ISBN
//           </label>
//           <input
//             type="text"
//             name="isbn"
//             value={formData.isbn}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Category
//           </label>
//           <input
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Quantity
//           </label>
//           <input
//             type="number"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Status
//           </label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           >
//             <option value="AVAILABLE">Available</option>
//             <option value="BORROWED">Borrowed</option>
//             <option value="RESERVED">Reserved</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Add Book
//         </button>
//       </form>
//     </div>
//   );
// }
