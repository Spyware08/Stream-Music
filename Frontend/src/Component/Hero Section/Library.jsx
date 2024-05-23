import React, { useState, useEffect } from 'react';
import API from '../API/Api';
import getSpotifyToken from './Functions/tokenget';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

export default function Library() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function Getdata() {
      let userInfo = sessionStorage.getItem('userInfo');
      if (!userInfo) {
        console.error("No user info found in session storage");
        return;
      }

      let email = JSON.parse(userInfo).useremail;
      if (!email) {
        console.error("User email not found");
        return;
      }
      console.log("Email:", email); // Debugging line

      try {
        setLoading(true);
        const res = await API.post("/favsong", { email }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.status !== 200) {
          throw new Error(`Unexpected response code: ${res.status}`);
        }
        const musicList = res.data.MusicList;

        // Get Spotify access token
        let token;
        try {
          token = await getSpotifyToken();
          if (!token) {
            throw new Error("Failed to retrieve Spotify token");
          }
        } catch (e) {
          console.error("Error fetching Spotify token:", e.message);
          return;
        }

        const songDetailsPromises = musicList.map(songId =>
          axios.get(`https://api.spotify.com/v1/tracks/${songId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        );

        const songDetailsResponses = await Promise.all(songDetailsPromises);
        const songDetails = songDetailsResponses.map(response => response.data);

        setSongs(songDetails);
        setLoading(false);
      } catch (e) {
        console.error("Error during API call:", e.message);
      }
    }

    Getdata();
  }, []);

  return (
    <div className="container mx-auto p-4 overflow-scroll overflow-x-hidden h-[100vh]">

      <h1 className="text-3xl font-bold mb-4">Your Favourite Songs</h1>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <PulseLoader color="#3b82f6" />
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {songs.map((track, index) => (
            <li key={index} className="border border-gray-300 rounded p-4 flex flex-col justify-between hover:shadow-xl hover:border-blue-500 bg-white">
              <div className="text-start">
                <img src={track.album.images[0].url} alt={track.name} className="w-full h-48 object-cover mb-4 rounded" />
                <h2 className="text-lg font-semibold">{track.name}</h2>
                <div className='flex items-center justify-between'>
                  <p className="text-gray-600">{track.artists[0].name}</p>
                </div>
              </div>
              <div>
                {track.preview_url ? (
                  <audio
                    controls
                    className="mt-4 lg:w-full md:w-[200px] sm:w-[150px]"
                    src={track.preview_url}
                  >
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <p className="font-semibold mb-[15px] text-red-500">No audio available !</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
