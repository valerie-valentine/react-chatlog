import React from 'react';
import './SendMessage.css'
import { useState } from 'react';

const SendMessageForm = (props) => {
  const [message, SetMessage] = useState({
    'sender': 'Vladimir',
    'body': '',
  });
  
  const handleMessageChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    
    const newMessageData = {...message, [name]: value};
    SetMessage(newMessageData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
        sender: message.sender,
        body: message.body,
    }
    props.onHandleSubmit(newMessage)
    SetMessage({
      'sender': message.sender,
      'body': '',
    });
  };

  return (
    <form className="send-message" onSubmit={handleSubmit}>
      <label htmlFor="body" hidden>
        Enter Message
      </label>
      <input
        id="body"
        name="body"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        onChange={handleMessageChange}
        value={message.body}
      />
      <button type="submit">Send</button>
      <select id="sender" name='sender' onChange={handleMessageChange}>
        <option value='Vladimir'>Vladimir</option>
        <option value='Estragon'>Estragon</option>
      </select>
    </form>
  );
};
export default SendMessageForm;