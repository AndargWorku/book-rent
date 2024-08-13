import  { useState } from 'react';
import {  FiSearch, FiX } from 'react-icons/fi';
import { MdOutlineCancel } from "react-icons/md";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchText, setSearchText] = useState('');

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex flex-col items-center py-3">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            
            <a href="#" className="text-orange-500 text-xl font-bold">Book</a>
            
           
          </div>
          <div className="flex-grow mx-4 relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for "
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none"
            />
            {searchText && (
              <button onClick={clearSearch} className="absolute right-0 top-0 mt-1.5 mr-10 text-gray-500">
                <FiX className="h-5 w-5" />
              </button>
            )}
            
            <button className="absolute right-0 top-0 mt-1.5 mr-11 ">
              < MdOutlineCancel className="h-6 w-6" />
            </button>
            <button className="absolute right-0 top-0 mt-1.5 mr-2 bg-orange-500 text-white rounded-2xl">
              <FiSearch className="h-6 w-6" />
            </button>
            
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/register" className=' text-gray-700'>signup</Link>
            
           
            <Link to="/login" className=' text-gray-700'>Login</Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;



// import { useState } from 'react';
// import { FiMenu, FiSearch, FiGift, FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
// import { MdOutlineCancel } from "react-icons/md";
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const [searchText, setSearchText] = useState('');
//   const navigate = useNavigate();

//   const clearSearch = () => {
//     setSearchText('');
//   };

//   const handleSearch = () => {
//     if (searchText.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchText)}`);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="bg-white shadow-md">
//       <div className="container mx-auto flex flex-col items-center py-3">
//         <div className="flex items-center w-full justify-between">
//           <div className="flex items-center">
//             <a href="#" className="text-orange-500 text-xl font-bold">Book</a>
//             <button className="text-gray-700 mr-4">
//               <FiMenu className="h-6 w-6" />
//             </button>
//             <a href="#" className="text-lg">Categories</a>
//           </div>
//           <div className="flex-grow mx-4 relative">
//             <input
//               type="text"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Search for books"
//               className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none"
//             />
//             {searchText && (
//               <button onClick={clearSearch} className="absolute right-0 top-0 mt-1.5 mr-10 text-gray-500">
//                 <FiX className="h-5 w-5" />
//               </button>
//             )}
//             <button className="absolute right-0 top-0 mt-1.5 mr-2 bg-orange-500 text-white rounded-2xl" onClick={handleSearch}>
//               <FiSearch className="h-6 w-6" />
//             </button>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link to="/register" className="text-gray-700">Signup</Link>
//             <a href="#" className="text-gray-700">
//               <FiHeart className="h-6 w-6" />
//             </a>
//             <a href="#" className="text-gray-700">
//               <FiGift className="h-6 w-6" />
//             </a>
//             <a href="#" className="text-gray-700">
//               <FiShoppingCart className="h-6 w-6" />
//             </a>
//           </div>
//         </div>
//         <div className="flex flex-wrap justify-center space-x-6 mt-2">
//           <a href="#" className="text-gray-700">Gift Mode</a>
//           <a href="#" className="text-gray-700">Back to home</a>
//           <a href="#" className="text-gray-700">Favorites</a>
//           <a href="#" className="text-gray-700">Store</a>
//           <Link to="/register" className="text-gray-700">Registry</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;





