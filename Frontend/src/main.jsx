import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import router from './routes/Routers';
// import { RouterProvider } from 'react-router-dom';
import { persistor, store } from "./state/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
      {/* <RouterProvider router={router} /> */}
    </PersistGate>
    </BrowserRouter>
  </Provider>
  
);



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import router from './routes';
// import './index.css';
// import {BrowserRouter} from "react-router-dom";
// import { RouterProvider } from 'react-router-dom';
// import { persistor, store } from "./state/store";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   // <React.StrictMode>
//       <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//     <BrowserRouter>
  
//       <RouterProvider router={router}/>
    
//     </BrowserRouter>
//     </PersistGate>
//     </Provider>
//   // </React.StrictMode>,
// );
