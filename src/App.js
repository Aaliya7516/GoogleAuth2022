import {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {
  const [user, setuser] = useState({});

  function handleCallbackResponse(response){
    var useObject = jwt_decode(response.credential);
    setuser(useObject);
    document.getElementById("signInDiv").hidden = true
  }

  function handleSignOut(event){
    setuser({});
    document.getElementById("signInDiv").hidden = false
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <div className="App">
      <br/>
      <div id="signInDiv"></div>
      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
          <p>{user.email}</p>

        </div>
      }
      <br/>
      {
        Object.keys(user).length != 0 &&
        <button id="signOutBtn" onClick={(e) => handleSignOut()}>Sign Out</button>
      }
    </div>
  );
}

export default App;
