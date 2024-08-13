 import { FaSearch } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { FiAlignJustify } from "react-icons/fi";
import { FiPause } from "react-icons/fi";
import { FiWifi } from "react-icons/fi";
import Header from "../components/Header";
import { useState, useEffect } from "react";

const Books = () => {
  const initialBooks = [
    {
      author: "J.K. Rowling",
      owner: "Nardos T",
      category: "Fiction",
      bookName: "Harry Potter",
      status: true,
    },
    {
      author: "George Orwell",
      owner: "Alex K",
      category: "Dystopian",
      bookName: "1984",
      status: false,
    },
    {
      author: "J.R.R. Tolkien",
      owner: "Sami B",
      category: "Fantasy",
      bookName: "The Hobbit",
      status: true,
    },
    {
      author: "F. Scott Fitzgerald",
      owner: "Sara M",
      category: "Classic",
      bookName: "The Great Gatsby",
      status: true,
    },
    {
      author: "Harper Lee",
      owner: "John D",
      category: "Fiction",
      bookName: "To Kill a Mockingbird",
      status: false,
    },
    {
      author: "Dan Brown",
      owner: "David L",
      category: "Thriller",
      bookName: "The Da Vinci Code",
      status: true,
    },
    {
      author: "Jane Austen",
      owner: "Lucy S",
      category: "Romance",
      bookName: "Pride and Prejudice",
      status: false,
    },
    {
      author: "Mark Twain",
      owner: "Emma T",
      category: "Classic",
      bookName: "Adventures of Huckleberry Finn",
      status: true,
    },
  ];

  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  // const [owner, setOwner] = useState("");

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = () => {
    const filteredBooks = initialBooks.filter((book) =>
      Object.values(book).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setBooks(filteredBooks);
  };

  const handleFilter = () => {
    const filteredBooks = initialBooks.filter((book) => book.status === true);
    setBooks(filteredBooks);
  };

  const handleSort = () => {
    const sortedBooks = [...books].sort((a, b) =>
      a.bookName.localeCompare(b.bookName)
    );
    setBooks(sortedBooks);
  };

  const handleReset = () => {
    setBooks(initialBooks);
    setSearchTerm("");
    setIsSearchVisible(false);
  };

  const toggleStatus = (index) => {
    const updatedBooks = books.map((book, i) =>
      i === index ? { ...book, status: !book.status } : book
    );
    setBooks(updatedBooks);
  };

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:5000/books",{
      method : "GET",
      headers : {
        "Content-Type": "application/json"},
  });
  const data = await response.json();
    await setBooks(data);
  }

  // const fetchOwner = async (id) => {
  //   const response = await fetch(`http://localhost:5000/users/${id}`, {
  //     method: "GET",
  //     headers : {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   const data = await response.json()
  //   setOwner(data);
  // }

  useEffect(() => {
    fetchBooks();
  })

  return (
    <div>
      <Header />

      <div className="p-4 bg-white rounded-lg shadow-lg mt-4">
        <h4 className="mb-4">Book list</h4>

        <div className="flex justify-end space-x-4">
          {isSearchVisible && (
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-2xl focus:outline-none"
            />
          )}
          <button
            onClick={() => {
              toggleSearch();
              handleSearch();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaSearch className="w-5 h-5" />
          </button>
          <button
            onClick={handleReset}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiWifi className="cursor-pointer hover:text-black" />
          </button>
          <button
            onClick={handleFilter}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiPause className="cursor-pointer hover:text-black" />
          </button>
          <button
            onClick={handleSort}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiAlignJustify className="cursor-pointer hover:text-black" />
          </button>
          <button
            onClick={() => console.log("Price Filter clicked")}
            className="text-gray-500 hover:text-gray-700"
          >
            <HiOutlineAdjustmentsHorizontal className="cursor-pointer hover:text-black" />
          </button>
        </div>

        <div className="bg-white rounded-md overflow-hidden mt-3">
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-600">
                <thead>
                  <tr className="text-left bg-gray-100">
                    <th className="py-2 px-3">No.</th>
                    <th className="py-2 px-3">Author</th>
                    <th className="py-2 px-3">Owner</th>
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3">Book Name</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-3">{index + 1}</td>
                      <td className="py-2 px-3">{book.author}</td>
                      <td className="py-2 px-3 flex items-center">
                        <img
                          src="https://via.placeholder.com/30"
                          alt="Owner Avatar"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        {/* {owner.name} */}
                      </td>
                      <td className="py-2 px-3">{book.category}</td>
                      <td className="py-2 px-3">{book.name}</td>
                      <td className="py-2 px-3 flex items-center">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs  rounded-full ${
                            book.status
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {book.status == "actve" ? (
                            <>
                              <svg
                                className="w-4 h-4 mr-1 text-sm text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Active
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4 mr-1 text-sm text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M18 12H6"
                                />
                              </svg>
                              Inactive
                            </>
                          )}
                        </span>
                        <label className="flex items-center cursor-pointer ml-3">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={book.status}
                              onChange={() => toggleStatus(index)}
                              className="sr-only "
                            />
                            <div
                              className={`block bg-gray-200 w-14 h-8 rounded-full text-sm ${
                                book.status ? "bg-green-500" : "bg-gray-200"
                              }`}
                            ></div>
                            <div
                              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                                book.status
                                  ? "transform translate-x-full bg-green-700"
                                  : ""
                              }`}
                            ></div>
                          </div>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
