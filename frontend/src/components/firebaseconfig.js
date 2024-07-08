// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1HM21aHyyponqxuxn38Zs2bUI1qj9jMY",
  authDomain: "solopro-425817.firebaseapp.com",
  projectId: "solopro-425817",
  storageBucket: "solopro-425817.appspot.com",
  messagingSenderId: "794145458559",
  appId: "1:794145458559:web:23310098687259cf70324a",
  measurementId: "G-XLJDP5HBHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;