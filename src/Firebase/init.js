// src/Firebase/init.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC84xSdM-dofjehv9J19remoFmED5lmyIY',
  authDomain: 'week7-jessica.firebaseapp.com',
  projectId: 'week7-jessica',
  storageBucket: 'week7-jessica.firebasestorage.app',
  messagingSenderId: '975345935790',
  appId: '1:975345935790:web:52fbe4161eddad31ff143f',
  measurementId: 'G-HJG8LB6DDE',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
