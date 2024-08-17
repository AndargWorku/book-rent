
import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { FiTrash2, FiEye, FiAlignJustify, FiPause, FiWifi } from 'react-icons/fi';

import Header from '../components/Header';

const OwnerList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmApproveOpen, setConfirmApproveOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [owners, setOwners] = useState([
    { id: 1, owner: 'Nardos T', upload: '15 Books', location: 'Addis Ababa', status: 'Active' },
    { id: 2, owner: 'Mekdes A', upload: '20 Books', location: 'Bahir Dar', status: 'Active' },
    { id: 3, owner: 'Mulu D', upload: '12 Books', location: 'Gondar', status: 'Active' },
    { id: 4, owner: 'Helen G', upload: '18 Books', location: 'Hawassa', status: 'Active' },
    { id: 5, owner: 'Yonas B', upload: '22 Books', location: 'Jimma', status: 'Active' },
  ]);

  const handleEyeClick = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  const handleSave = async (id) => {
    await fetch(`https://book-rent-delta.vercel.app/users/${id}`,{
      method : "PUT",
      headers : {
        "Content-Type": "application/json"},
      body: JSON.stringify(selectedItem),
  });
    setIsPopupOpen(false);
    window.location.reload();
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setConfirmDeleteOpen(true);
  };

  const handleApprove = (item) => {
    setSelectedItem(item);
    setConfirmApproveOpen(true);
  };

  const confirmDelete = async () => {
    await fetch(`https://book-rent-delta.vercel.app/users/${selectedItem.id}`,{
      method : "DELETE",
      headers : {
        "Content-Type": "application/json"},
  });
    setConfirmDeleteOpen(false);
    window.location.reload();
  };

  const confirmApprove = async () => {
    await fetch(`https://book-rent-delta.vercel.app/users/${selectedItem.id}`,{
      method : "PUT",
      headers : {
        "Content-Type": "application/json"},
      body: JSON.stringify({status: "active"}),
  });
    setConfirmApproveOpen(false);
    window.location.reload();
  };

  const toggleSearchBar = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const switchToListView = () => {
    setViewMode('list');
  };

  const switchToGridView = () => {
    setViewMode('grid');
  };

  const toggleStatus = (index) => {
    const updatedOwners = owners.map((owner, idx) =>
      idx === index ? { ...owner, status: owner.status === 'Active' ? 'Inactive' : 'Active' } : owner
    );
    setOwners(updatedOwners);
  };

  const fetchOwners = async () => {
    const response = await fetch("https://book-rent-delta.vercel.app/users",{
      method : "GET",
      headers : {
        "Content-Type": "application/json"},
  });
  const data = await response.json();
    await setOwners(data);
  }

  useEffect(() => {
    fetchOwners();
  })

  return (
    <div className="p-4">
      <Header />
      <div className="shadow-md rounded-lg bg-white mt-2">
        {/* Top-right Icons */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-700">List of Owners</h2>

          <div className="flex justify-end space-x-4">
            {isSearchVisible && (
              <input
                type="text"
                placeholder="Search books..."
                className="p-2 border border-gray-300 rounded-2xl focus:outline-none"
              />
            )}
            <button onClick={toggleSearchBar} className="text-gray-500 hover:text-gray-700">
              <FaSearch className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <FiWifi
                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={toggleSearchBar}
              />
              <FiPause
                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => console.log('Filter icon clicked')}
              />
              <FiAlignJustify
                className={`w-5 h-5 cursor-pointer hover:text-gray-700 ${viewMode === 'list' ? 'text-gray-700' : 'text-gray-500'}`}
                onClick={switchToListView}
              />
              <HiOutlineAdjustmentsHorizontal
                className={`w-5 h-5 cursor-pointer hover:text-gray-700 ${viewMode === 'grid' ? 'text-gray-700' : 'text-gray-500'}`}
                onClick={switchToGridView}
              />
            </div>
          </div>
        </div>

        {/* Table or Grid */}
        <div className="overflow-x-auto">
          {viewMode === 'list' ? (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">No.</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Owner</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Upload</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Location</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {owners.map((owner, index) => (
                  <tr key={owner.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`0${index + 1}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Avatar"
                        className="h-10 w-10 rounded-full mr-4"
                      />
                      {owner.first_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{owner.count} Books</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{owner.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                        </div>
                        <span className={`ml-3 text-sm font-medium ${owner.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                          {owner.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-3">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          handleEyeClick(owner)
                        }
                      >
                        <FiEye className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(owner)}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        onClick={() => handleApprove(owner)}
                      >
                        {owner.status === "active" ? "Approved" : "Approve"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {owners.map((owner, index) => (
                <div key={owner.id} className="bg-white shadow-md rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">{owner.first_name}</p>
                      <p className="text-gray-600 text-sm">{owner.count} Books</p>
                      <p className="text-gray-600 text-sm">{owner.location}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={owner.status === 'Active'}
                        onChange={() => toggleStatus(index)}
                      />
                      <div className="relative">
                        <div className={`w-12 h-6 bg-green-200 rounded-full shadow-inner ${owner.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div
                          className={`dot absolute w-4 h-4 bg-white rounded-full shadow -left-1 -top-1 transition-transform duration-300 transform ${owner.status === 'Active' ? 'translate-x-full bg-green-500' : 'bg-red-500'
                            }`}
                        ></div>
                      </div>
                      <span className={`ml-3 text-sm font-medium ${owner.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                        {owner.status === 'Active' ? 'Active' : 'Inactive'}
                      </span>
                    </label>

                    <div className="flex space-x-3">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          handleEyeClick(owner)
                        }
                      >
                        <FiEye className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(owner)}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        onClick={() => handleApprove(owner)}
                      >
                        {owner.status === "active" ? "Approved" : "Approve"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Owner Details</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Owner</label>
                <input
                  type="text"
                  name="name"
                  value={selectedItem?.name}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload</label>
                <input
                  type="text"
                  name="count"
                  value={selectedItem?.count}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={selectedItem?.location}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={selectedItem?.status}
                  onChange={handleInputChange}
                  className="p-2 mt-1 block w-full border border-gray-300 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </form>
            <div className="flex justify-end">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                onClick ={() => {
                  handleSave(selectedItem.id)
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDeleteOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setConfirmDeleteOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Approve Modal */}
      {confirmApproveOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Approve</h3>
            <p className="mb-4">Are you sure you want to approve this item?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setConfirmApproveOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerList;











