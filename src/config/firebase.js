import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsDIFu3As1BpAMU-vnpxZ0CvPaUdWpffQ",
  authDomain: "charter-teams.firebaseapp.com",
  projectId: "charter-teams",
  storageBucket: "charter-teams.firebasestorage.app",
  messagingSenderId: "435935928445",
  appId: "1:435935928445:web:59e94918bbed45d7c51114",
  measurementId: "G-6Z3VT7VDFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app; 