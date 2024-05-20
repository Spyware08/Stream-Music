// Component/Hero Section/Homepage.js
import React, { useEffect, useState } from 'react';
import getSpotifyToken from './Functions/tokenget';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

import { Link } from 'react-router-dom';

export default function Homepage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);

        const token = await getSpotifyToken();
        const artistNames = ["Sidhumoose Wala", "Sonu Nigam", "Tupac", 'Taylor Swift', "Diljit ", "Honey Singh", 'Akon', 'Eminem', "Kishore", "Ammy Virk", "Ar Rahman"];
        const artistPromises = artistNames.map(name =>
          axios.get('https://api.spotify.com/v1/search', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            params: {
              q: name,
              type: 'artist',
              limit: 1
            }
          })
        );

        const artistResponses = await Promise.all(artistPromises);
        const fetchedArtists = artistResponses.map(response => response.data.artists.items[0]);
        setArtists(fetchedArtists);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="container overflow-scroll h-[100vh] overflow-x-hidden w-full p-4">
      <h1 className="text-3xl font-bold ">Welcome to <span className='text-blue-600 font-serif'>Stream Music</span></h1>
      <p className='mt-[-7px] ml-1 mb-5 text-sm font-semibold'>Here you Listen your Favorite Artists</p>
      <h2 className=''>Listen our Best <span className='text-blue-600 font-semibold' >Singers</span> :</h2>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <PulseLoader color="#3b82f6" />
        </div>

      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {artists.map((artist, index) => (
            <li key={index} className="border border-gray-300 rounded p-4 flex flex-col shadow-sm bg-gray-100 hover:border-blue-500 hover:shadow-xl ">
              <Link to={`/artist/${artist.id}`}>
                {artist.images.length > 0 && (
                  <img src={artist.images[0].url} alt={artist.name} className="w-full h-48 object-contain mb-4 rounded" />
                )}
                <div className="text-start">
                  <h2 className="text-lg font-semibold">{artist.name}</h2>
                  <p className="text-gray-900"><span className='text-blue-600 font-semibold'>Popularity </span>: {artist.popularity}</p>
                  <p className="text-gray-900"><span className='text-green-700 font-semibold'>Genres</span>: {artist.genres[0]}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
