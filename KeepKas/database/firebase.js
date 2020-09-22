import firebase from 'firebase'

const firebaseConfig = {
   apiKey: "AIzaSyCcf8tjg-TmWbrKg8jJVZp8S3XoAvzaptI",
   authDomain: "keepkas-f2253.firebaseapp.com",
   databaseURL: "https://keepkas-f2253.firebaseio.com",
   projectId: "keepkas-f2253",
   storageBucket: "keepkas-f2253.appspot.com",
   messagingSenderId: "559730097970",
   appId: "1:559730097970:web:7065479f629347c3f3612b",
   measurementId: "G-EHZH09MKZX"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 export default firebase