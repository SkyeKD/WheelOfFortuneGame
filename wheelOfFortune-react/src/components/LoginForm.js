import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './GlobalContext';

// LoginSuccessful is a function sent in by parent component
function LoginForm({ LoginEvent }) {
    const { googleID, updateGoogleID } = useGlobalContext();
    const firebaseConfig = {
        apiKey: "AIzaSyCqxHDg3mlIlUNokf8pd9VjAwAj9HgmOq4",
        authDomain: "wheeloffortune-login.firebaseapp.com",
        projectId: "wheeloffortune-login",
        storageBucket: "wheeloffortune-login.appspot.com",
        messagingSenderId: "5607927999",
        appId: "1:5607927999:web:0a67b3ffc5b342530f160a",
        measurementId: "G-KS9Z5VWJDD"
    };

    initializeApp(firebaseConfig);

    const [loggedUser, setLoggedUser] = useState('');

    // function to sign in with Google's page
    const signInWithGoogle = () => {

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithRedirect(auth, provider)
            .then((result) => {
                // User signed in
                console.log(result.user);
                setLoggedUser(result.user)

            }).catch((error) => {
                // Handle Errors here.
                console.error(error);
            });
    };

    // function to sign out
    function logoutGoogle() {
        const auth = getAuth();
        auth.signOut();
        setLoggedUser(null)
    }

    // we put the onAuthStateChanged in useEffect so this is only called when 
    // this component mounts  
    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                console.log("User is signed in:", user);


                setLoggedUser(user);
                updateGoogleID(user.email);
                localStorage.setItem("googleId",user.email)

            } else {
                // No user is signed in.
                console.log("No user is signed in.");
            }
            LoginEvent(user);
        });
        
    }, []);
    // note the ? to show either login or logout button
    return (
        <div >
            {loggedUser ?
                <>
                    <div>
                        <button onClick={logoutGoogle} style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#3498db',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '30px'
                        }}>Sign out</button>
                        <p>Welcome, {loggedUser.email}!</p>
                    </div>
                </>

                : <div >
                    <button onClick={signInWithGoogle}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#2ecc71',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}>Sign in with Google</button>
                    <p>Please sign in to continue.</p> </div>
            }

        </div>
    );

}
export default LoginForm;