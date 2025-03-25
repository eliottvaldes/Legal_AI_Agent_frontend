import React from 'react';
import Chat from './components/Chat';

function App() {
  return (
    <div className="container p-3">
      <h1 className="text-center mb-4">Chat Legal</h1>
      <div className='row'>
        <Chat />
      </div>
    </div>
  );
}

export default App;
