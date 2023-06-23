import React from 'react';
import './App.css';
import chatMessages from './data/messages.json';
import ChatLog from './components/ChatLog';
import { useState } from 'react';
import ColorChoice from './components/ColorChoice';

const App = () => {
  const [chatData, setChatData] = useState(chatMessages);
  const [localColor, setLocalColor] = useState('green');
  const [remoteColor, setRemoteColor] = useState('blue');

  const onUpdateLikes = (entryToUpdate) => {
    const entries = chatData.map((entry) => {
      if (entry.id === entryToUpdate.id) {
        return entryToUpdate;
      }
      return entry;
    });
    setChatData(entries);
  };
  
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
        {/* pass localcolor & remotecolor to chatentry & chatlog*/}
      </main>
    </div>
  );
};

export default App;
