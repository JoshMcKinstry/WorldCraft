import React, { Component } from 'react';
import draw from './Voronoi.js';
//fence like component to create a border between React and D3
export default class Viz extends Component{
  componentDidMount(){
    draw(this.props);
  }
  componentDidUpdate(prevProps){
    draw(this.props);
  }
  render(){
    return(
      <div className = "Voronoi"/>
    )
  }
}