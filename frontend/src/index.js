import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';
import Stepper from './components/Timeline';
import SignupQuestions from './components/SignupQuestions';

import reportWebVitals from './reportWebVitals';
 import 'bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   {/* <Auth0Provider
    domain="dev-ibo1u4x8dizagzxx.us.auth0.com"
    clientId="9StbMrWwMvRQGpMI0Jw8X803bTemP8ue"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  > */}
    <App />
    {/* <Stepper /> */}

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
