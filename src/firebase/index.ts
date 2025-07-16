// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5nL44GmsfmGkJL7k7jjy3GPopVZ2xUz8",
  authDomain: "scada-fb.firebaseapp.com",
  projectId: "scada-fb",
  storageBucket: "scada-fb.firebasestorage.app",
  messagingSenderId: "142377353666",
  appId: "1:142377353666:web:f9f97779c012d0c0ff165b",
  measurementId: "G-GVRLFN70VJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (app) {
  console.log("Firebase connected");
}

export const db = getFirestore();

interface logMailProps {
  uid: string;
  displayName: string;
  messages: logMessageProps[];
}

interface logMessageProps {
  uid: string;
  name: string;
  receiveMessage: MessageProps[];
  sentMessage: MessageProps[];
}

interface MessageProps {
  time: Date;
  text: string;
}

export const createUserLogMessage = async (
  logMail: logMailProps,
  addtionalInformation = {}
) => {
  const userDocRef = doc(db, "users", logMail?.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, messages } = logMail;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        messages,
        createdAt,
        ...addtionalInformation,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocRef;
};
