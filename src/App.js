import React from 'react';
import './App.css';
// import chatMessages from './data/messages.json';
import ChatLog from './components/ChatLog';
import { useState, useEffect } from 'react';
import ColorChoice from './components/ColorChoice';
import SendMessageForm from './components/SendMessage'; 
import TimeStamp from './TimeStamp';
import axios from 'axios';


const kBaseUrl = 'http://localhost:5000';

const getAllMessages = () => {
  return axios
    .get(`${kBaseUrl}/messages`)
    .then((response) => {
      return response.data.map(convertFromApi);
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateLikesApi = (id, liked) => {
  const endpoint = liked ? 'mark_liked' : 'mark_unliked';

  return axios
    .patch(`${kBaseUrl}/messages/${id}/${endpoint}`)
    .then((response) => {
      return convertFromApi(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
};


const convertFromApi = (apiMessage) => {
  const {time_stamp: timeStamp, ...message} = apiMessage;
  const newMessage = {timeStamp, ...message};
  return newMessage;
};


const App = () => {
  const [chatData, setChatData] = useState([]);
  const [localColor, setLocalColor] = useState('green');
  const [remoteColor, setRemoteColor] = useState('blue');

  const fetchMessages = () => {
    getAllMessages()
    .then((messages) => {
      setChatData(messages);
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const onHandleSubmit = (data) => {
    axios.post(`${kBaseUrl}/messages`, data)
      .then((response) => {
        setChatData((prevMessages) => [convertFromApi(response.data.message), ...prevMessages]);
      })
      .catch((error) => console.log(error));
  };



  const onUpdateLikes = (id, liked) => {
    updateLikesApi(id, liked).then((updatedMessage) => {
      setChatData((oldData) => {
        return oldData.map((message) => {
          if (message.id === id) {
            return updatedMessage;
          }
          return message;
          });
        });
      });
    };

  // const onUpdateLikes = (entryToUpdate) => {
  //   const entries = chatData.map((entry) => {
  //     if (entry.id === entryToUpdate.id) {
  //       return entryToUpdate;
  //     }
  //     return entry;
  //   });
  //   setChatData(entries);
  // };
  
  const calcTotalLikes = (Data) => {
    let totalLikes = 0;
    for (const chat of Data) {
      if (chat.liked) {
        totalLikes += 1;
      }
    }
    return totalLikes;
  };

  const totalLikeCount = calcTotalLikes(chatData);

  const updateLocalColor = (color) => {
    setLocalColor(color);
  } 

  const updateRemoteColor = (color) => {
    setRemoteColor(color);
  } 


  return (
    <div id="App">
      <header>
        <h1>Vivi's ChatLogs</h1>
        <section className='colorSection'>
          <div>
          <ColorChoice setColorCallback={updateLocalColor} />
          </div>
          <div>
          <h2>{totalLikeCount} ❤️s</h2>
          </div>
          <div>
          <ColorChoice setColorCallback={updateRemoteColor}/>
          </div>
        </section>
      </header>
      <main>
        <ChatLog entries={chatData} onUpdateLikes={onUpdateLikes} localColor={localColor} remoteColor={remoteColor}/>
        <SendMessageForm onHandleSubmit={onHandleSubmit} timeStamp={TimeStamp}/>
      </main>
    </div>
  );
};

export default App;
