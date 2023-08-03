// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY as string,
	authDomain: import.meta.env.VITE_AUTHDOMAIN as string,
	projectId: import.meta.env.VITE_PROJECTID as string,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET as string,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID as string,
	appId: import.meta.env.VITE_APPID as string,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);
