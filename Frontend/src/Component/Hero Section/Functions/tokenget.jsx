import axios from 'axios';

const getSpotifyToken = async () => {
  const client_id = "350189937dec491cb9351a358c342f80";
  const client_secret = "1923c77d2e14494688066297ab17f954";

  const token = btoa(`${client_id}:${client_secret}`);

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'client_credentials'
    }).toString(),
    {
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  return response.data.access_token;
};

export default getSpotifyToken;
