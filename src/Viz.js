//viz strictly takes the information generated from controller 
//then uses d3 for da maths and to draw with it
import React, { Component } from 'react';
import * as d3 from "d3";
import draw from "./Voronoi.js"

export default class Viz extends Component{
    componentDidMount(){
        draw(this.props);
    }
    componentDidUpdate(prevProps){
    //this makes sure we don't redraw unnecessarily --
    //only when we add a new shape
    if(this.props.points.length !== prevProps.points.length){
        d3.select('.viz > *').remove();
        draw(this.props);
      }
    }
    render() {
        return (
          <div className="viz" />
        )
      }

}