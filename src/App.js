import React from 'react';
import './App.css';
import Controller from './components/Controller.js';

class App extends React.Component {

 render() {
    return (
      <div className="WorldCraft div">
     <h2 className ="title">Welcome to WorldCraft Demo</h2>
     <Controller/>  
      </div>
    );
  }
}

export default App;