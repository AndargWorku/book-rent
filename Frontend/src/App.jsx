

// import Layout from './components/layout/Layout'
// import AdminPanel from './pages/AdminPanel'
// import AdminRoutes from './routes/AdminRoutes'

// const App = () => {
//   return (
//     <div>
//       <AdminPanel/>
//   <Layout/>
 
//   </div> 
//   )
// }

// export default App

// import './App.css';
// import { Outlet } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Footer from './components/Footer';
// import Context from './context';

// function App() {
//   return (
//     <>
//       <Context.Provider value={{ }}>
//         <ToastContainer position="top-center" />
//         <main className="min-h-[calc(100vh-120px)] pt-16">
//           <Outlet />
//         </main>
//         <Footer />
//       </Context.Provider>
//     </>
//   );
// }

// export default App;



import './App.css'
import {  Route, Routes} from "react-router-dom"
import Dashboard from "./Admin/Dashboard"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import OwnerList from "./Admin/OwnerList.jsx"

import Notification from "./Admin/Notification.jsx"
import Books from "./Admin/Books.jsx"

import BookUpload from './Admin/owener/BookUpload.jsx'
import ProductDetail from "./pages/ProductDetail"
import ProductList from './pages/ProductList.jsx'
import Logout from './pages/Logout.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import Settings from './Admin/Setting.jsx'




const App = () => {
  return (
    <div>
        
     <Routes>
     
      <Route path="/" element={<ProductList/>}/>
      <Route path="admin-panel" element={<AdminPanel />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload-book" element={<BookUpload/>} />
          <Route path="owner-list" element={<OwnerList />} />
          <Route path="book" element={<Books />} />
          <Route path="setting" element={<Settings />} />
        
        </Route>
      {/* <Route path='/admin-panel' element={<AdminPanel/>}/> */}
   
    
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/register" element={<Register/>}/>

      <Route path="/notification" element={<Notification/>}/>     
     <Route path="/product/:id" element={<ProductDetail/>}/>
    </Routes>
      
          
    </div>
    
  )
}

export default App















