import React from 'react';
import './App.css';
import chatMessages from './data/messages.json';
import ChatLog from './components/ChatLog';
import { useState } from 'react';

const App = () => {
  const [chatData, setChatData] = useState(chatMessages);

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


  return (
    <div id="App">
      <header>
        <h1>Vivi's ChatLogs</h1>
        <section>
        <h2>{totalLikeCount} ❤️s</h2>
        </section>
      </header>
      <main>
        <ChatLog entries={chatData} onUpdateLikes={onUpdateLikes}/>
      </main>
    </div>
  );
};

export default App;
