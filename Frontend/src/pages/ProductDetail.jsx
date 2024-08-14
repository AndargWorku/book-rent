import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState('');
  

  useEffect(() => {
   
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`);
       
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleRentClick = () => {
    setIsModalOpen(true);
    setMessage(''); 
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setDates(e.target.value);
  };

  // Function to handle form submission
  const handleFormSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dates }),
      });

      if (response.ok) {
        setMessage('Successfully rented');
      } else {
        setMessage('Not rented');
      }
    } catch (error) {
      setMessage('Not rented');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Navbar/>
      {/* Breadcrumb Navigation */}
      <nav className="text-sm mb-4 text-gray-600">
       
        <span className="font-semibold">{product.category || "detial of books"}</span>
      </nav>

      <div className="lg:flex lg:space-x-8">
        {/* Image Gallery */}
        <div className="lg:w-1/2 flex">
          {/* Thumbnails */}
          <div className="flex flex-col space-y-2 mr-4">
              <img
                src={product.cover_image}
                alt="Thumbnail"
                className="w-16 h-16 object-cover rounded-lg border-2 border-gray-300 cursor-pointer"
              />
          </div>

          {/* Main Image */}
          <div className="relative w-full">
            <img
              src={product.cover_image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow">
              &#9664;
            </button>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow">
              &#9654;
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          <h1 className="text-2xl font-semibold mb-2">
            {product.name}
          </h1>
          <p className="text-red-500 text-lg font-semibold">yours favoirate books</p>
          <p className="text-3xl font-bold mb-4">Birr {product.price}</p>

          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>author:</strong> {product.author}
            </p>
            
            <p className="text-gray-700">
              <strong>quantity:</strong> {product.quantity} 
            </p>
            <p className="text-gray-500">Returns & exchanges accepted</p>
          </div>

          <div>
      <button
        onClick={handleRentClick}
        className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg w-full lg:w-auto"
      >
        add to rent
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">How many dates?</h2>
            <input
              type="date"
              value={dates}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
              placeholder="Enter number of dates"
            />
            <button
              onClick={handleFormSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Submit
            </button>
            {message && (
              <div className="mt-4 text-center text-lg font-semibold">
                <p>{message}</p>
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>

          {/* Review Summary */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Other reviews from this book</h2>
            <div className="flex items-center mt-2">
              <div className="flex space-x-1 text-yellow-500">
                {/* Display rating as stars */}
                {Array.from({ length: Math.round(product.rating) }, (_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
              </div>
              <p className="ml-2 text-gray-600">({product.reviewsCount} reviews)</p>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              {product.reviewText}
            </p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


