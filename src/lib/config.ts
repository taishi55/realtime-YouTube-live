
import { initializeApp } from "firebase/app";
//add your credentials from firebase project
const firebaseConfig = {
    apiKey: "AIzaSyDe6MuXUDeqITZlorccrMIsTkCyv34hbQU",
    authDomain: "lofi-gpt.firebaseapp.com",
    projectId: "lofi-gpt",
    storageBucket: "lofi-gpt.appspot.com",
    messagingSenderId: "267936041300",
    appId: "1:267936041300:web:26a96ea33a422665b0a0c1"
};
export const app = initializeApp(firebaseConfig);