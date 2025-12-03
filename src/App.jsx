import './App.css';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { useState, useEffect } from 'react';  


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  });




  // Sign up function
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user);
        console.log('User signed up:', userCredential.user);
      })
      .catch(error => {
        console.error('Error signing up:', error);
      });
  }

  //sign in function
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user);
        console.log('User signed in:', userCredential.user);
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  }

  // Log out function
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log('User logged out');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
    }


  return (
    <>
      <p>Firestore Authentication</p>

      <div>
       
        {
          !user && (
            <>
            <input type="text" placeholder='Email' value ={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder='Password' value ={password} onChange={(event)=> setPassword(event.target.value)}/>
              <button onClick={signUp}>Sign up</button>
              <button onClick={signIn}>Sign in</button>
            </>
          )
        }


        
      </div>

      {
        user && (
          <div>
            <p>Logged in as: {user.email}</p>
             <button onClick={logOut}>Log out</button>
          </div>
        )
      }
    </>
  )
}

export default App;

