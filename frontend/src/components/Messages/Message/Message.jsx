import React from 'react';
import './Message.css';

// Helper function to format the timestamp like WhatsApp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp); // Ensure timestamp is a valid date or number
  const now = new Date();

  // Check if the message is from today
  const isToday = date.toDateString() === now.toDateString();
  // Check if the message is from yesterday
  const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Show time like "10:30 AM"
  } else if (isYesterday) {
    return "Yesterday"; // Show "Yesterday"
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }); // Show date like "Jan 7"
  }
};

const Message = ({ message: { user, text, timestamp }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  // Format the timestamp
  const formattedTimestamp = formatTimestamp(timestamp);

  return (
    isSentByCurrentUser ? (
      <div className='messageContainer justifyEnd'>
        <p className='sentText pr-10'>{trimmedName}</p>
        <div className='messageBox backgroundBlue'>
          <p className='messageText colorWhite'>{text}</p>
        </div>
        <p className="messageTimestamp">{formattedTimestamp}</p>
      </div>
    ) : (
      <div className='messageContainer justifyStart'>
        <div className='messageBox backgroundLight'>
          <p className='messageText colorDark'>{text}</p>
        </div>
        <p className='sentText pl-10'>{user}</p>
        <p className="messageTimestamp">{formattedTimestamp}</p>
      </div>
    )
  );
}

export default Message;