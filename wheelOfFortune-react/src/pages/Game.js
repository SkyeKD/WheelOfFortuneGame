import React, { useState, useEffect } from 'react';
import '../App.css';
import './Game.css';
import Form from '../components/Form'
import SaveRecordModel from '../components/SaveRecordModel';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../components/GlobalContext';



function Game() {
    const [inputValueFromForm, setInputValueFromForm] = useState('');
    const [info, setInfo] = useState('');
    const [hiddenPhrase, setHiddenPhrase] = useState('');
    const [phrase, setPhrase] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const location = useLocation();
    const currentDate = getCurrentDate();
    const [submittedLetters, setSubmittedLetters] = useState([]);
    const phrases = [
        'Hello World',
        'Happy coding',
        'React is awesome',
        'JavaScript rocks',
        'Web development',
    ];
    const { googleID, updateGoogleID } = useGlobalContext();
    //get current date
    function getCurrentDate() {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }
    // get the phrase randomly
    const getRandomPhrase = () => {
        // setCurrentTimestamp(Date.now());
        const randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
    };
    // deal with submit button
    const handleFormSubmit = (value) => {
        // Receive the input value from MyForm and set it in App's state

        setInputValueFromForm(value);
        processGuess(value)
    };
    // get the hidden phrase according to the phrase
    const getHiddenPhrase = (phrase) => {
        let hiddenPhrase = '';

        for (let i = 0; i < phrase.length; i++) {
            if (/[a-zA-Z]/.test(phrase[i])) {
                hiddenPhrase += '*';
            } else {
                hiddenPhrase += phrase[i];
            }
        }
        return hiddenPhrase;
    }
    //process with the guess
    const processGuess = (ch) => {
        const newHiddenPhrase = [...hiddenPhrase];
        const normalizedCh = ch.toLowerCase();

        if (/^[a-zA-Z]$/.test(ch)) {
            if(submittedLetters.includes(normalizedCh)){
                setInfo("You have input that!");
                return;
            }
            setSubmittedLetters([...submittedLetters, normalizedCh]);// record the input letter
            let flag = false;

            for (let i = 0; i < phrase.length; ++i) {
                const letter = phrase[i].toLowerCase();
                if (letter === normalizedCh) {
                    flag = true;
                    newHiddenPhrase[i] = phrase[i];
                    setHiddenPhrase(newHiddenPhrase);
                }
            }

            if (!flag) {
                setScore(score - 2);
                setInfo("It's wrong! Input again!")
            } else {
                setScore(score + 10);
                setInfo("It's right. Input next guess")
            }
        } else {
            setInfo("It is not a letter!!!")
        }
        if (newHiddenPhrase.join('') === phrase) {
            // setCurrentTimestamp(Date.now());
            setInfo("Congratulations!");
            setIsGameOver(true);

        }
    }
    // initialize the game
    const initializeGame = () => {
        const newPhrase = getRandomPhrase();
        setPhrase(newPhrase);
        setInfo('');
        setHiddenPhrase(getHiddenPhrase(newPhrase));
        setScore(0);
        setSubmittedLetters([])
    };
    // handle with the replay button
    const handleReplayClick = () => {
        initializeGame();
    };
    //handle with the end game button
    const handleEndGameClick = () => {

        setInfo('Game ended. Thank you for playing!');
        setHiddenPhrase(getHiddenPhrase(phrase));
        setIsGameOver(true)
    };
    //handlwe with the save
    const handleSaveRecord = () => {
        setIsGameOver(false);
        saveGameRecord();
        initializeGame();
    };
    // post gameRecord to database
    async function saveGameRecord() {

        const postData = {
            googleId: googleID,
            score,
            timestamp: currentDate,
        };

        try {
            const response = await axios.post('https://wheeloffortune-game.wl.r.appspot.com/game/saveGameRecord', postData);

        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    useEffect(() => {
        initializeGame();
        localStorage.setItem("googleId",googleID);
    }, []);

    return (
        <div className="App">
            <img
                src="wheelOfFortune.png"
                alt="Top Image"
                style={{
                    height: '300px',
                    width: '1000px'
                }}
            />
            <div className="left-column">


                <div>
                    <Link to="/profile">
                        Go to Profile page
                    </Link>
                </div>
                <div style={{ marginTop: '30px' }}>
                    <Link to="/scores">
                        Go to Scores page
                    </Link>
                </div>
                <div style={{ marginTop: '30px' }}>
                    <Link to="/">
                        Go back to Login page
                    </Link>
                </div>
            </div>

            <div className="game-part">
                <h1>The following is the hiddenPhrase</h1>

                <div style={{
                    fontSize: '50px',
                    marginTop: '40px'
                }}>{hiddenPhrase}</div>
                <div>
                    {isGameOver ? (
                        <h1 style={{ color: 'red' }}>Game Over</h1>
                    ) : (
                        <p ></p>
                    )}
                    <div style={{ fontSize: '30px', color: 'purple' }}>Score: {score}</div>
                </div>
                <div className="form-container">
                    <Form onSubmit={handleFormSubmit} />
                    <h2>{info}</h2>
                    <div>
                        <button className='bottom-button replay-button' onClick={handleReplayClick}>Replay</button>
                        <button className='bottom-button end-game-button' onClick={handleEndGameClick}>End Game</button>
                    </div>

                </div>
            </div>
            <SaveRecordModel
                isOpen={isGameOver}
                onClose={() => {
                    
                    setIsGameOver(false);
                    initializeGame()
                }}
                onSave={handleSaveRecord}
            />
        </div>
    );
}

export default Game;
