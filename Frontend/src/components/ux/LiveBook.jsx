import { useState, useEffect } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { FiAlignJustify, FiPause, FiWifi } from "react-icons/fi";
import { FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa";

const BookStatusTable = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [deleteBookId, setDeleteBookId] = useState(null);

  // Fetch books from the backend
  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleDeleteClick = (bookId) => {
    setDeleteBookId(bookId);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:5000/books/${deleteBookId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setBooks(books.filter((book) => book.id !== deleteBookId));
          setDeleteBookId(null); // Close the modal
        } else {
          console.error("Error deleting book");
        }
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  const handleEditClick = (book) => {
    setEditBook(book);
  };

  const handleEditSave = () => {
    fetch(`http://localhost:5000/books/${editBook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editBook),
    })
      .then((response) => {
        if (response.ok) {
          setBooks(books.map((book) => (book.id === editBook.id ? editBook : book)));
          setEditBook(null); // Close the modal
        } else {
          console.error("Error editing book");
        }
      })
      .catch((error) => console.error("Error editing book:", error));
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md relative block">
      <h2 className="text-lg font-semibold mb-4">Live Book Status</h2>
      <div className="absolute top-4 right-4 flex space-x-4 text-gray-500">
        <FaSearch className="cursor-pointer hover:text-black" onClick={handleSearchClick} />
        <FiWifi className="cursor-pointer hover:text-black" />
        <FiPause className="cursor-pointer hover:text-black" />
        <FiAlignJustify className="cursor-pointer hover:text-black" />
        <HiOutlineAdjustmentsHorizontal className="cursor-pointer hover:text-black" />
      </div>

      {showSearchBar && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by book name..."
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg mt-8">
          <thead>
            <tr className="w-full bg-gray-100 text-left">
              <th className="px-4 py-2 border">No.</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Book Name</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={book.id} className="text-left">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{book.quantity}</td>
                <td className="px-4 py-2 border">{book.name}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      book.status === "Rented" ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></span>
                  {book.status}
                </td>
                <td className="px-4 py-2 border">{book.price}</td>
                <td className="px-4 py-2 border flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditClick(book)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClick(book.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteBookId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p>Are you sure you want to delete this book?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setDeleteBookId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Edit Book</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Book Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={editBook.name}
                onChange={(e) =>
                  setEditBook({ ...editBook, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={editBook.quantity}
                onChange={(e) =>
                  setEditBook({ ...editBook, quantity: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={editBook.price}
                onChange={(e) =>
                  setEditBook({ ...editBook, price: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setEditBook(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookStatusTable;
