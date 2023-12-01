import React, { useState, useEffect } from 'react';
import '../App.css';
import LoginForm from '../components/LoginForm'
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

function StartPage() {

    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    // user is the currently logged in user
    const [user, setUser] = useState(null);
    // title is just a sample value entered in form

    // when the user submits form...don't really do anything in this sample
    async function handleSubmit(event) {
        event.preventDefault();

        // do whatever on submit
        const postData = {
            googleId: localStorage.getItem("googleId"),
            name: username
        };

        try {
            const response = await axios.post('https://wheeloffortune-game.wl.r.appspot.com/user/saveUserRecord', postData);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    // this will be called by the LoginForm
    function HandleLogin(user) {
        setUser(user);

    }


    const startGame = () => {
        navigate('/game');
    };
    // handle the input
    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };


    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img
                src="wheelOfFortune.png"
                alt="Description of the image"
                style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '10px' }}
            />
            {/* <button onClick={signInWithGoogle}>Sign in with Google</button>
	  <button onClick={signOutUser}>Sign out</button>
      <p>{userId}</p> */}

            <div >

                <LoginForm LoginEvent={HandleLogin} />
                {/* show the input if the user has logged in */}
                {user ?
                    <form onSubmit={handleSubmit}>
                        <label>
                            Please input your username:
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                            <button type="submit">Submit</button>
                        </label>

                        <br />

                    </form> : <br />
                }

            </div>

            <div>
                <button onClick={startGame}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: 'purple',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '30px'
                    }}>Start the Game</button>
            </div>

        </div>
    );
}

export default StartPage;