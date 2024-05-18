// Component/ArtistPage.js
import React, { useEffect, useState } from 'react';
import getSpotifyToken from './Hero Section/Functions/tokenget';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

export default function ArtistPage() {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [artistname, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      setLoading(true);
      try {
        const token = await getSpotifyToken();

        const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setArtist(artistResponse.data);

        // Fetch top tracks
        const tracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            market: 'US'
          }
        });
        setTracks(tracksResponse.data.tracks);

      } catch (error) {
        console.error('Error fetching artist details or top tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [id]);

  return (
    <div className="container mx-auto overflow-scroll p-4">
      <h1 className="text-3xl font-semibold mb-4 ">
        Top Tracks of <span className='font-bold font-serif text-blue-600 underline'>{artistname && ` ${artistname.name}`}</span>
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <PulseLoader color="#3b82f6" />
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {tracks.map((track, index) => (
            <li key={index} className="border border-gray-300 rounded p-4 flex flex-col justify-between shadow-sm bg-white">


              <div className="text-start">
                <img src={track.album.images[0].url} alt={track.name} className="w-full h-48 object-cover mb-4 rounded" />
                <h2 className="text-lg font-semibold">{track.name}</h2>
                <p className="text-gray-600">{track.artists[0].name}</p>

              </div>
              <div>
                {track.preview_url ? (
                  <audio
                    controls
                    className="mt-4 mx-auto lg:w-full md:w-[200px] sm:w-[150px]"
                    src={track.preview_url}
                    onPlay={(e) => handlePlay(e.target)}
                  >
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <p className="mb-[15px] font-semibold text-red-500">No audio available</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const handlePlay = (target) => {
  const audios = document.querySelectorAll("audio");
  audios.forEach(audio => {
    if (audio !== target) {
      audio.pause();
    }
  });
};
