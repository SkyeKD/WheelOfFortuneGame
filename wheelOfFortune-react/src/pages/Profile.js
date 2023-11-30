import React, { useState, useEffect } from 'react';
import '../App.css';
import { useGlobalContext } from '../components/GlobalContext';
import axios from 'axios'
import { Link } from 'react-router-dom';


function Profile() {
  const { googleID, updateGoogleID } = useGlobalContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usernameChange, setUsernameChange] = useState('');
  const [username, setUsername] = useState('');



  //delete the record by id
  const handleDelete = (id) => {
    console.log(id)
    axios.delete('https://wheeloffortune-game.wl.r.appspot.com/game/deleteGameRecord/' + id)
      .then(response => {
        displayByGoogleId();
        console.log("delete", response)
      })
      .catch(error => {
        setError(error.message);
        console.log("error.message", error.message)

      });
  };
  //change the name 
  const handleChange = () => {
    console.log(usernameChange)
    const postData = {
      googleId: googleID,
      name: usernameChange
    };

    try {
      const response = axios.post('https://wheeloffortune-game.wl.r.appspot.com/user/saveUserRecord', postData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  //get the username by googleId
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
  // display all the records by googleId
  const displayByGoogleId = () => {
    axios.get('https://wheeloffortune-game.wl.r.appspot.com/game/findByGoogleId', {
      params: {
        googleId: googleID
      }
    })
      .then(async (response) => {
        //use Promise.all to wait for all the getUsername
        const usernames = await Promise.all(response.data.map((score) => getUsername(score.googleId)));
        // combine usernames and scores
        setUsername(usernames[0])
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
     // if googleId undefined, get it from localStorage
    updateGoogleID(localStorage.getItem("googleId"));
  }, [updateGoogleID]);

  useEffect(() => {
    if (googleID) {
      // cal  get again if googleID change
      displayByGoogleId();
    }
  }, [googleID]);

  return (
    <div className="Profile">
      <Link to="/game">
        Go back to Game page
      </Link>
      <h1>Profile</h1>
      <div style={{ marginLeft: '70px'  }}>
        <form onSubmit={handleChange}>
          <h2>Edit Username</h2>
          <div>Your current username is : {username}</div>
          <label>
            Please input the username you want to change:
            <input type="text" value={usernameChange} onChange={e => setUsernameChange(e.target.value)} />
            <button type="submit">Change</button>
          </label>

          <br />

        </form> <br />
      </div>
      <div>
        <h2>Records for {googleID}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '20px',marginLeft: '70px'  }}>
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
                    <button
                      style={{ color: 'red' }}
                      onClick={() => handleDelete(score.id)}
                    >
                      Delete
                    </button>
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

export default Profile;
