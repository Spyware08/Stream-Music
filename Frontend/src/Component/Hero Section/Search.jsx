import React, { useEffect, useState } from 'react';
import getSpotifyToken from './Functions/tokenget';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';

export default function Search() {
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("Lata Mangeshkar");
  const [token, setToken] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getSpotifyToken();
        setToken(token);
        handleSearch()
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          q: searchQuery,
          type: 'track'
        }
      });
      console.log("data", response.data.tracks.items);
      setTracks(response.data.tracks.items);
    } catch (error) {
      console.error('Error searching tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (audioElement) => {
    if (currentAudio && currentAudio !== audioElement) {
      currentAudio.pause();
      currentAudio.currentTime = 0; 
    }
    setCurrentAudio(audioElement);
  };

  return (
    <div className="container mx-auto p-4 overflow-scroll overflow-x-hidden h-[100vh]">
      <h1 className="text-3xl font-bold mb-4">Search Your Songs Here :</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="mb-6">
        <div className="flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a song"
            className="w-[50%] font-serif p-2 border border-gray-300 rounded-xl outline-none"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white mx-2 rounded">Search</button>
        </div>
      </form>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <PulseLoader color="#3b82f6" />
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {tracks.map((track, index) => (
            <li key={index} className="border border-gray-300 rounded p-4 flex flex-col justify-between hover:shadow-xl cursor-pointer hover:border-blue-500 bg-white">


              <div className="text-start">
                <img src={track.album.images[0].url} alt={track.name} className="w-full h-48 object-cover mb-4 rounded" />
                <h2 className="text-lg font-semibold">{track.name}</h2>
                <p className="text-gray-600">{track.artists[0].name}</p>

              </div>
              <div>
                {track.preview_url ? (
                  <audio
                    controls
                    className="mt-4 lg:w-full md:w-[200px] sm:w-[150px]"
                    src={track.preview_url}
                    onPlay={(e) => handlePlay(e.target)}
                  >
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <p className=" font-semibold mb-[15px] text-red-500">No audio available !</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
