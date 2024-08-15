
import ReactDOM from 'react-dom/client';
import './index.css';

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
     
    </PersistGate>
    </BrowserRouter>
  </Provider>
  
);



