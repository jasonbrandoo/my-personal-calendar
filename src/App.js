import React from 'react';
import './App.scss';
import Calendar from './component/Calendar';
import Navbar from './component/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="root">
        <Calendar />
      </div>
    </>
  );
}

export default App;
