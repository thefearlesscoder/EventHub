import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';

import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById("root")).render(

  <div className=' bg-richblack-900 w-full min-h-screen'>

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </div>
);
