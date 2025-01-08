import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import './Chat.css'

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState('')
  const ENDPOINT = 'http://localhost:8080';

  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users)
      localStorage.setItem('roomData', JSON.stringify(users));
    })
  }, [])

  useEffect(() => {
    socket.on('chatHistory', (messages) => {
      console.log(messages);  // Log messages to verify they are correctly received
      setMessages(messages);
    });
  }, []);

  const handleTyping = (event) => {
    const inputMessage = event.target.value;
    setMessage(inputMessage); // Update message state

    if (socket) {
      if (inputMessage.trim() !== '') {
        socket.emit('typing', { room, user: name });
      } else {
        socket.emit('stopTyping', { room });
        setTyping(''); // Clear typing indicator locally
      }
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (message.trim() !== '') {
      socket.emit('sendMessage', message, () => {
        setMessage(''); // Clear message input
        socket.emit('stopTyping', { room }); // Notify the server that the user has stopped typing
        setTyping(''); // Clear typing indicator locally
      });
    }
  };

  useEffect(() => {
    socket.on('typing', ({ user }) => {
      setTyping(`${user} is typing...`);
    });

    socket.on('stopTyping', () => {
      setTyping('');
    });
  }, []);

  useEffect(() => {
    socket.on('sessionToken', ({ sessionToken }) => {
      localStorage.setItem('sessionToken', sessionToken);
    });
  }, []);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        {typing && <p className='typingIndicator'>{typing}</p>}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleTyping={handleTyping}
          setTyping={setTyping}
        />
      </div>
      {/* <TextContainer users={users} /> */}
    </div>
  );
};

export default Chat;