import React from 'react';
import './ChatEntry.css';
import PropTypes from 'prop-types';
import TimeStamp from './TimeStamp';


const ChatEntry = ({ id, sender, body, timeStamp, liked, 
  onUpdateLikes, localColor, remoteColor }) => {
  const onButtonClick = () => {
    onUpdateLikes({
      id: id,
      sender: sender,
      body: body,
      timeStamp: timeStamp,
      liked: !liked,
    });
  };

  const toggleHeart = liked ? '❤️' : '🤍';
  const chatEntryClass = sender === 'Vladimir' ? 'local' : 'remote';
  const colorClass = chatEntryClass === 'local' ? localColor : remoteColor;
  
  
  return (
    <div className={`chat-entry ${chatEntryClass}`}>
      <h2 className="entry-name">{sender}</h2>
      <section className="entry-bubble">
        <p className={colorClass}>{body}</p>
        <p className="entry-time"><TimeStamp time={timeStamp}/></p>
        <button className="like" onClick={onButtonClick}>{toggleHeart}</button>
      </section>
    </div>
  );
};


ChatEntry.propTypes = {
  id: PropTypes.number.isRequired,
  sender: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timeStamp: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  onUpdateLikes: PropTypes.func
};


export default ChatEntry;
