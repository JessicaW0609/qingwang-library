import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC84xSdM-dofjehv9J19remoFmED5lmyIY',
  authDomain: 'week7-jessica.firebaseapp.com',
  projectId: 'week7-jessica',
  storageBucket: 'week7-jessica.firebasestorage.app',
  messagingSenderId: '975345935790',
  appId: '1:975345935790:web:52fbe4161eddad31ff143f',
  measurementId: 'G-HJG8LB6DDE',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)

const app = createApp(App)
app.use(router)
app.mount('#app')
