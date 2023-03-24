import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAX76-OS4Q76HQ6wEawvmNKFpdn40iSLPA",
    authDomain: "curso-react-js-c5cfa.firebaseapp.com",
    projectId: "curso-react-js-c5cfa",
    storageBucket: "curso-react-js-c5cfa.appspot.com",
    messagingSenderId: "392705764909",
    appId: "1:392705764909:web:f23aed2fa988196d0c52a4"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export {db, auth};