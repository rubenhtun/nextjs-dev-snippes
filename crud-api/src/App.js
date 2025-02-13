import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const BookInventory = () => {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      quantity: 5,
      category: "Fiction",
      status: "In Stock",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0446310789",
      quantity: 3,
      category: "Fiction",
      status: "Low Stock",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
      quantity: 0,
      category: "Science Fiction",
      status: "Out of Stock",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "978-0141439518",
      quantity: 7,
      category: "Classic Romance",
      status: "In Stock",
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "978-0547928227",
      quantity: 2,
      category: "Fantasy",
      status: "Out of Stock",
    },
    {
      id: 6,
      title: "Brave New World",
      author: "Aldous Huxley",
      isbn: "978-0060850524",
      quantity: 0,
      category: "Science Fiction",
      status: "Out of Stock",
    },
  ];

  const getStatusClassName = (status) => {
    switch (status) {
      case "In Stock":
        return "status-in-stock";
      case "Low Stock":
        return "status-low-stock";
      case "Out of Stock":
        return "status-out-of-stock";
      default:
        return "";
    }
  };

  return (
    <div className="inventory-container">
      <h1 className="inventory-title">Book Inventory</h1>
      <div className="table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.category}</td>
                <td>{book.quantity}</td>
                <td className={getStatusClassName(book.status)}>
                  {book.status}
                </td>
                <td>
                  <div className="actions-container">
                    <button className="action-button">
                      <Edit2 className="action-icon" />
                    </button>
                    <button className="action-button">
                      <Trash2 className="action-icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookInventory;
