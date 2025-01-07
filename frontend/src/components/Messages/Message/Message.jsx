const Message = ({ message: { user, text, timestamp }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  // Convert timestamp to a human-readable format
  const formattedTimestamp = new Date(timestamp).toLocaleString();

  return (
    isSentByCurrentUser ? (
      <div className='messageContainer justifyEnd'>
        <p className='sentText pr-10'>{trimmedName}</p>
        <div className='messageBox backgroundBlue'>
          <p className='messageText colorWhite'>{text}</p>
        </div>
        <p className="messageTimestamp">{formattedTimestamp}</p> {/* Display timestamp */}
      </div>
    ) : (
      <div className='messageContainer justifyStart'>
        <div className='messageBox backgroundLight'>
          <p className='messageText colorDark'>{text}</p>
        </div>
        <p className='sentText pl-10'>{user}</p>
        <p className="messageTimestamp">{formattedTimestamp}</p> {/* Display timestamp */}
      </div>
    )
  );
}