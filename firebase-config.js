// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "calmoris-7f87f.firebaseapp.com",
    projectId: "calmoris-7f87f",
    storageBucket: "calmoris-7f87f.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log('Firestore initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
}