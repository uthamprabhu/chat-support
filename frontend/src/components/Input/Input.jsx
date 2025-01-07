import React from 'react'
import './Input.css'

const Input = ({ message, setTyping, sendMessage, handleTyping }) => {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input
        className='input'
        type="text"
        placeholder='Type a message'
        value={message}
        onChange={handleTyping}
        onKeyDown={(event) => event.key === 'Enter' && sendMessage(event)}
      />

      <button
        type="submit"
        className='sendButton'
        onClick={(event) => 
          sendMessage(event)
        }
      >
        Send
      </button>
    </form>
  );
};

export default Input;