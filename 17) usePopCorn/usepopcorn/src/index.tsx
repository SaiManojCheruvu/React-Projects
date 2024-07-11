import React from 'react';
import ReactDOM from 'react-dom/client';
import { StarRating } from './StarRating';
// import App from './App';
// import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} />
    <StarRating maxRating={10} size={24} color='red'/>
  </React.StrictMode>
);
