import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import io from 'socket.io-client';

import './Join.css';

const ENDPOINT = 'http://localhost:8080'; // Replace with your server endpoint
let socket;

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState('');
  const [activeRooms, setActiveRooms] = useState([]);

  const validRooms = ['hardware', 'software', 'network', 'billing', 'login', 'account', 'email', 'security', 'storage'];

  useEffect(() => {
    // Initialize socket connection
    socket = io(ENDPOINT);

    // Listen for updates on active rooms
    socket.on('activeRoomsUpdate', (updatedActiveRooms) => {
      setActiveRooms(updatedActiveRooms); // Dynamically update active rooms
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  const handleSignIn = (e) => {
    if (!name || !room) {
      e.preventDefault();
      setError('Both fields are required.');
    } else if (!validRooms.includes(room.toLowerCase())) {
      e.preventDefault();
      setError('Invalid room. Please select a valid issue from the list.');
    } else {
      setError(''); // Clear any previous error
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Chat Support</h1>
        <div>
          <input
            required
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            required
            placeholder="Room (e.g., hardware)"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        {error && <p className="errorText">{error}</p>}
        <Link
          onClick={handleSignIn}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
        <div className="issueSuggestions">
          <p>Possible Rooms:</p>
          {validRooms.map((validRoom, index) => (
            <span
              key={index}
              className={activeRooms.includes(validRoom) ? 'activeRoom' : ''}
            >
              {validRoom}
            </span>
          ))}
        </div>
        <div className="infoText">
          <p>
            <strong>Note:</strong> Active rooms are highlighted in <span className="green">green</span>.
            Please use your name and the active room to join and assist users in real time.
          </p>
        </div>
      </div>
    </div>
  );
}
