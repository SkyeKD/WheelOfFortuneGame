import React, { useState, useEffect } from 'react';
import '../App.css';
import { useGlobalContext } from '../components/GlobalContext';
import axios from 'axios'
import { Link } from 'react-router-dom';


function Scores() {
  const { googleID, updateGoogleID } = useGlobalContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get username by googleId
  const getUsername = async (googleId) => {
    try {
      const response = await axios.get('https://wheeloffortune-game.wl.r.appspot.com/user/findByGoogleId', {
        params: {
          googleId: googleId
        }
      });

      console.log(response.data);
      console.log(response.data[0].name)
      return response.data[0].name || '';
    } catch (error) {
      console.error('Error fetching username:', error);
      return '';
    }
  };
  // get all the records
  const displayAll = () => {
    axios.get('https://wheeloffortune-game.wl.r.appspot.com/game/findAllGameRecords'

    )
      .then(async (response) => {
        // use Promise.all to wait for all getUsername
        const usernames = await Promise.all(response.data.map((score) => getUsername(score.googleId)));

        //combine usernames and scores
        const updatedRecords = response.data.map((score, index) => ({
          ...score,
          username: usernames[index],
        }));

        setRecords(updatedRecords);
        setLoading(false);
        console.log("updatedRecords", updatedRecords);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    googleID ? updateGoogleID(googleID) : updateGoogleID(localStorage.getItem("googleId"))
    displayAll();

  }, []);

  return (
    <div className="Scores">
      <Link to="/game">
        Go back to Game page
      </Link>
      <h1>Scores</h1>
      <div>
        <h2>Records for All players</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '20px', marginLeft: '70px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>username</th>
                <th style={{ textAlign: 'left' }}> Google ID</th>
                <th style={{ textAlign: 'left' }}>Score</th>
                <th style={{ textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((score) => (
                <tr key={score.id}>
                  <td style={{ textAlign: 'left' }}>{score.username}</td>
                  <td style={{ textAlign: 'left' }}>{score.googleId}</td>
                  <td style={{ textAlign: 'left' }}>{score.score}</td>
                  <td style={{ textAlign: 'left' }}>{score.timestamp}</td>
                  <td style={{ textAlign: 'left' }}>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


      </div>
    </div>
  );
}

export default Scores;
