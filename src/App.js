import React from 'react';
import Button from './components/Button';
import Controller from './components/Controller';
import './components/css/App.css';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {HomeState:true}
  }

  newMapClicked = () =>{
    this.setState({
      ...this.state,
      HomeState:false,
      ControllerState:true
    })
  }

 render() { 
    return (
        <div className="LandingPage">
        <h2 type ="title" className ="title">Welcome to WorldCraft</h2>
        {this.state.HomeState && <Button
        label = "New Map" 
        handleClick = {this.newMapClicked}
        ></Button>}
        {this.state.ControllerState && <Controller/>}
        </div>
    );
  }
}

export default App;