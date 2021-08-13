import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC3wZFnEQP7X4gFgVOs2nyAyj-OoBZc4NA",
    authDomain: "chat-react-gb.firebaseapp.com",
    projectId: "chat-react-gb",
    storageBucket: "chat-react-gb.appspot.com",
    messagingSenderId: "539274696541",
    appId: "1:539274696541:web:ec89ce6ed373d72005bab4",
    databaseURL: "https://chat-react-gb-default-rtdb.europe-west1.firebasedatabase.app"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)