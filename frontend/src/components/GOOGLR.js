import React, { useState } from 'react';
import googedata from './googlecredentials.json';
const CLIENT_ID = googedata.CLIENT_ID; // Replace with your client ID
const REDIRECT_URI = 'http://localhost:3000';

const CreateMeet = () => {
  const [authCode, setAuthCode] = useState('');

  const handleAuth = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar.events&include_granted_scopes=true&response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = authUrl;
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/createMeet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: authCode }),
    });

    const result = await response.text();
    console.log(result);
  };

  const handleRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setAuthCode(code);
    }
  };

  React.useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <div>
      <button onClick={handleAuth}>Authenticate with Google</button>
      {authCode && (
        <div>
          <button onClick={handleSubmit}>Create Meet Link</button>
        </div>
      )}
    </div>
  );
};

export default CreateMeet;
