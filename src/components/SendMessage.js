import React from 'react';
import './SendMessage.css'
import { useState } from 'react';

const SendMessageForm = (props) => {
  const [message, SetMessage] = useState('');
  
  const handleMessageChange = (event) => {
    SetMessage(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
        sender: sender,
        body: body,
    }
    props.onHandleSubmit()
    SetMessage('');
  };

  return (
    <form className="send-message" onSubmit={handleSubmit}>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        onChange={handleMessageChange}
        value={message}
      />
      <button type="submit">Send</button>
    </form>
  );
};
export default SendMessageForm;