
import { Routes, Route } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductDetail from '../pages/ProductDetail';

import Dashboard from '../Admin/Dashboard';
import BookUpload from '../Admin/owener/BookUpload';
import OwnerList from '../Admin/OwnerList';
import Books from '../Admin/Books';
import Notification from '../Admin/Notification';
import Settings from '../Admin/Setting';
import Logout from '../pages/Logout';


import AdminPanel from '../pages/AdminPanel';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path='/admin-panel' element={<AdminPanel/>}/>
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="upload-book" element={<BookUpload />} />
      <Route path="owner-list" element={<OwnerList />} />
      <Route path="books" element={<Books />} />
      <Route path="notification" element={<Notification />} />
      <Route path="settings" element={<Settings />} />
      <Route path="logout" element={<Logout />} />
   
    </Routes>
  );
}

export default Routers;




// import {  Route, Routes } from 'react-router-dom'
// // import App from '../App'

// import ProductList from '../pages/ProductList'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// import ProductDetail from '../pages/ProductDetail'
// import BookUpload from '../Admin/owener/BookUpload'
// import OwnerList from '../Admin/OwnerList'
// import Books from '../Admin/Books'
// import Notification from '../Admin/Notification'
// import Settings from '../Admin/Setting'
// import Dashboard from '../Admin/Dashboard'
// import AdminPanel from '../pages/AdminPanel'

// import Logout from '../pages/Logout'



// const Routers = () => {[
//                        {
//                         path: "admin-panel",
//                         element: <AdminPanel />,
//                         children: [
//                             {
//                                 path: "dashboard",
//                                 element: <Dashboard />
//                             },
//                             {
//                                 path: "upload-book",
//                                 element: <BookUpload />
//                             },
//                             {
//                                 path: "owner-list",
//                                 element: <OwnerList />
//                             },
//                             {
//                                 path: "books",
//                                 element: <Books />
//                             },
//                             {
//                                 path: "notification",
//                                 element: <Notification />
//                             },
//                             {
//                                 path: "settings",
//                                 element: <Settings />
//                             },
//                             {
//                                 path: "logout",
//                                 element: <Logout />
//                            }
//                          ]}]
//   return (
//     <Routes>
//         <Route path="/" element={<ProductList/>}/>
//         <Route path="/product/:id" element={<ProductDetail/>}/>
//         <Route path='/admin-panel' element={<AdminPanel/>}/>
//         <Route path="/admin-panel/:upload-book" element={<BookUpload/>}/>
//         <Route path="/admin-panel/:books" element={<Books/>}/>
//         <Route path="/admin-panel/:owner-list" element={<OwnerList/>}/>
//         <Route path='/admin-panel/:logout' element={<Logout/>}/>
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/register" element={<Register/>}/>
//         <Route path="/admin-panel/:dashboard" element={<Dashboard/>}/>
      
//     </Routes>
//   )
// }

// export default Routers


// // const Routers= createBrowserRouter([
// //     {
// //         path: "/",
// //         element: <App />,
// //         children: [
// //             {
// //                 path: "/",
// //                 element: <ProductList />
// //             },
// //             {
// //                 path: "login",
// //                 element: <Login />
// //             },
// //             {
// //                 path: "register",
// //                 element: <Register />
// //             },
// //             {
// //                 path: "product/:id",
// //                 element: <ProductDetail />
// //             },
// //             {
// //                 path: "admin-panel",
// //                 element: <AdminPanel />,
// //                 children: [
// //                     {
// //                         path: "dashboard",
// //                         element: <Dashboard />
// //                     },
// //                     {
// //                         path: "upload-book",
// //                         element: <BookUpload />
// //                     },
// //                     {
// //                         path: "owner-list",
// //                         element: <OwnerList />
// //                     },
// //                     {
// //                         path: "books",
// //                         element: <Books />
// //                     },
// //                     {
// //                         path: "notification",
// //                         element: <Notification />
// //                     },
// //                     {
// //                         path: "settings",
// //                         element: <Settings />
// //                     },
// //                     {
// //                         path: "logout",
// //                         element: <Logout />
// //                     }
// //                 ]
// //             }
// //         ]
// //     }
// // ])

// // export default Routers;
