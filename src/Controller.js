import React, {Component} from 'react';
import Viz from './Viz.js';

export default class Controller extends Component{

    state = {
        points :"",
        toDraw:[],
    }

    onSubmit = (evt)=> {
        evt.preventDefault();
        const newVoronoi= {
            points:this.state.points,
        }
        this.setState({toDraw: [...this.state.toDraw, newVoronoi]})
    }

    onChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
    }

    render(){
        return(
        <div className="controller">
        <form onSubmit={this.onSubmit}>
            <label htmlFor="pixelInput">how many points:</label>
            <input id="pixelInput" name="width" onChange={this.onChange} />
            <button type="submit">draw!</button>
        </form>
        { this.state.toDraw.length ? <Viz points={this.state.toDraw}/> : null}
      </div>
        )
    }


}
