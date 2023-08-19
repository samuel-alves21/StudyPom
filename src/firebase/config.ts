import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyBzzUg2xrSEmOQQCN_tIKHHmIGyxqrCzWw',
  authDomain: 'pomodoro-app-cf8c3.firebaseapp.com',
  projectId: 'pomodoro-app-cf8c3',
  storageBucket: 'pomodoro-app-cf8c3.appspot.com',
  messagingSenderId: '1082552740889',
  appId: '1:1082552740889:web:497d12a602d2b54a458e88',
  measurementId: 'G-H196GVFDT4',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
// const analytics = getAnalytics(app)
