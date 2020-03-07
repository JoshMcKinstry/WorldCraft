import React from 'react';
import './App.css';
import Controller from './Controller';

class App extends React.Component {

 render() {
    return (
      <div className="BubbleFun">
     <h2 className ="title">Welcome to D3 fun baby!!!</h2>

     <Controller/>  
      </div>
      /*<div className = "ScatterPlot">
        <p>Here's a ScatterPlot now</p>

      </div>*/
    );
  }
}

export default App;