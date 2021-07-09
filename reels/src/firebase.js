import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import 'firebase/firestore'
firebase.initializeApp({
    apiKey: "AIzaSyCBpPU9iHX378oZSKTqBXUPBzbpuo-gkME",
    authDomain: "reels-40b22.firebaseapp.com",
    projectId: "reels-40b22",
    storageBucket: "reels-40b22.appspot.com",
    messagingSenderId: "904897954009",
    appId: "1:904897954009:web:68a14d12da447d8271fec8"
  })
export const auth=firebase.auth()
const firestore=firebase.firestore(); //we will not export whole firestore so that we can only provide those information which we want to  provide
export const database={
users:firestore.collection('users'),// exporting user will only provide info in "user" collection/database
getCurrTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}
//   export default firebase     
// ..we will not pass whole of firebase we will only those components which are needed  and only which we want to provide
export const storage=firebase.storage();