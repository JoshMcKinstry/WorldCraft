import React from 'react';
import Button from './components/Button';
import Controller from './components/Controller';
import logo from './WorldCraft.png';
import styled from 'styled-components';
import "./App.css";

const Image = styled.img`
    top:50%;
    left:50%;
    margin-top:-100px;
    margin-left:425px;
  `;
class App extends React.Component {
  constructor(props){
    super(props);
    this.displayData = [];

    this.state = {
      HomeState:true,
    };
  }

  newMapClicked = () =>{
    this.setState({
      ...this.state,
      HomeState:false,
      ControllerState:true,
    })
  };


 render() { 
    return (
      <div className="LandingPage">
        {this.state.HomeState &&<Image class = "logo" src = {logo}></Image>}
        {this.state.HomeState && <Button className = "newMapButton" label = "New Map" handleClick = {this.newMapClicked}></Button>}
        {this.state.ControllerState && <Controller/>}
        </div>
    );
  }
}

export default App;