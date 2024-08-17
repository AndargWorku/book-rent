import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("relevant");
  const [visibleCount, setVisibleCount] = useState(10);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://book-rent-delta.vercel.app/books");
      // http://localhost:5000/books
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    return product.category === filter;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high-low":
        return parseFloat(b.price) - parseFloat(a.price);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="p-4 w-full mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <select
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All Products</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {`${filteredProducts.length} results`}
            </span>
            <select
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="relevant">Sort by: Most relevant</option>
              <option value="price-low-high">Sort by: Price (Low to High)</option>
              <option value="price-high-low">Sort by: Price (High to Low)</option>
              <option value="rating">Sort by: Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-4 gap-4 py-4">
          {sortedProducts.slice(0, visibleCount).map((product) => (
            <div key={product.id} className="w-full p-2 flex-shrink-0 shadow-lg">
              <Link to={`/product/${product.id}`} target="_self">
              <img
                src={product.cover_image}
                alt={product.name}
                className="w-full h-24 object-cover rounded-md"
              />
              </Link>
              <h3 className="text-sm font-medium mt-2 truncate">
                <Link to={`/product/${product.id}`} target="_self">
                  {product.name}
                </Link>
              </h3>
              <div className="flex items-center mt-1">
                <AiFillStar className="text-yellow-500" />
                <span className="text-sm text-gray-600 ml-1">{product.category}</span>
                <span className="text-sm text-gray-600 ml-1">({product.quantity})</span>
                <span className="text-sm text-gray-600 ml-1">{product.author}</span>
              </div>
              <div className="mt-1">
                <span className="text-sm font-bold text-gray-800">
                  {product.price} birr
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-gray-500 line-through ml-2">
                    {product.oldPrice}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        {visibleCount < sortedProducts.length && (
          <div className="text-center mt-4">
            <button
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-50"
              onClick={handleSeeMore}
            >
              See more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;








