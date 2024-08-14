import { Route, Routes } from 'react-router-dom';
import AdminPanel from '../pages/AdminPanel';
import Dashboard from '../Admin/Dashboard';
import BookUpload from '../Admin/owener/BookUpload';
import OwnerList from '../Admin/OwnerList';
import Books from '../Admin/Books';
import Notification from '../Admin/Notification';
import Settings from '../Admin/Setting';
import Logout from '../pages/Logout';

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin-panel" element={<AdminPanel />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="upload-book" element={<BookUpload />} />
      <Route path="owner-list" element={<OwnerList />} />
      <Route path="books" element={<Books />} />
      <Route path="notification" element={<Notification />} />
      <Route path="settings" element={<Settings />} />
      <Route path="logout" element={<Logout />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
