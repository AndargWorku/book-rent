import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { SlBookOpen } from 'react-icons/sl';
import ROLE from '../common/Role';
import {
  FaTh,
  FaUserAlt,
  FaCogs,
  FaSignOutAlt,
  FaListAlt,
} from "react-icons/fa";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/admin-panel');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <aside className="bg-[#0B132B] min-h-full w-48 customShadow">
        <div className="flex items-center justify-between mb-6 text-blue-700 p-4">
          <FaBars className="cursor-pointer" />
          <div className="flex items-center">
            <SlBookOpen className="text-2xl" />
            <h1 className="ml-3 text-lg font-bold">Book Rent</h1>
          </div>
        </div>

        <nav className="grid gap-5 p-4">
          <Link to="/admin-panel/dashboard" className="px-2 py-1 text-white hover:bg-[#4166d3] rounded-md">
            <span className='flex gap-2'><FaTh /> Dashboard</span>
          </Link>
          <Link to="/admin-panel/upload-book" className="px-2 py-1 text-white hover:bg-[#4166d3] rounded-md">
            <span className='flex gap-2'><SlBookOpen /> Upload Book</span>
          </Link>
          <Link to="/admin-panel/owner-list" className="px-2 py-1 text-white hover:bg-[#4166d3] rounded-md">
            <span className='flex gap-2'><FaListAlt /> Owner List</span>
          </Link>
          <Link to="/admin-panel/book" className="px-2 py-1 text-white hover:bg-[#4166d3] rounded-md">
            <span className='flex gap-2'><SlBookOpen /> Books</span>
          </Link>
          <Link to="/admin-panel/setting" className="px-2 py-1 text-white hover:bg-[#4166d3] rounded-md">
            <span className='flex gap-2'><FaCogs /> Settings</span>
          </Link>
          <Link to="/admin-panel/login-as-owner" className="px-2 py-1 text-white hover:bg-[#4166d3] rounded-md">
            <span className='flex gap-2'><FaUserAlt /> Login as Owner</span>
          </Link>
          <div className="mt-36 justify-center bg-slate-700 rounded-lg text-white hover:bg-slate-800">
            <Link to="/logout" className="px-2 py-1">
              <span className='flex gap-2'><FaSignOutAlt className="icon text-xl" /> Logout</span>
            </Link>
          </div>
        </nav>
      </aside>

      <main className="flex-1 h-full p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;