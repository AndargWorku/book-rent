import { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaBell,
  FaCogs,
  FaSignOutAlt,
  FaListAlt,
} from "react-icons/fa";
import { SlBookOpen } from "react-icons/sl";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("owner"); // Default to 'owner'
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const handleRoleToggle = () => {
    const newRole = role === "owner" ? "admin" : "owner";
    setRole(newRole);

    // Navigate to the login page corresponding to the selected role
    if (newRole === "owner") {
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const menuItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/notifications",
      name: "Notification",
      icon: <FaBell />,
    },
    {
      path: "/settings",
      name: "Setting",
      icon: <FaCogs />,
    },
    // Conditionally render based on role
    ...(role === "owner"
      ? [
          {
            path: "/upload-book",
            name: "Book Upload",
            icon: <SlBookOpen />,
          },
        ]
      : [
          {
            path: "/owner-liset",
            name: "Owner List",
            icon: <FaListAlt />,
          },
          {
            path: "/book",
            name: "Books",
            icon: <SlBookOpen />,
          },
        ]),
  ];

  return (
    <div className="flex">
      <div
        className={`bg-[#0B132B] shadow-lg text-white h-auto transition-all duration-500 overflow-x-hidden ${
          isOpen ? "w-48" : "32"
        }`}
      >
        <div className="flex items-center justify-between mb-6 text-blue-700">
          <FaBars onClick={toggle} className="cursor-pointer" />
          <div className="flex items-center">
            <SlBookOpen className="text-2xl" />
            <h1 className="ml-3 text-lg font-bold">Book Rent</h1>
          </div>
        </div>

        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="block p-2.5 text-white hover:bg-[#4166d3] hover:text-white rounded-lg my-4"
          >
            <div className="flex items-center">
              <span className="mr-2">{item.icon}</span>
              <span className={`text-sm ml-1 ${isOpen ? "block" : "block"}`}>
                {item.name}
              </span>
            </div>
          </NavLink>
        ))}

        <div className="my-4">
          <button
            onClick={handleRoleToggle}
            className="flex items-center p-2 w-full rounded-md  hover:bg-[#4166d3] transition-colors"
          >
            <FaUserAlt className="icon text-xl" />
            <span className="ml-3">
              {role === "owner" ? "Login as Admin" : "Login as Owner"}
            </span>
          </button>
        </div>

        <div className=" mt-60">
        <Link to='/login'>
          <button className="flex items-center p-2 w-full rounded-md bg-[#5c5c8a] hover:bg-[#6666c7] transition-colors">
           
            <FaSignOutAlt className="icon text-xl" />
            <span className="ml-3 ">Logout</span>
           
          </button>
          </Link>
        </div>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Sidebar;

