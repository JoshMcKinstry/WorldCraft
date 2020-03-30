import React, {Component} from 'react';
import Viz from './Viz.js';

export default class Controller extends Component{

    state = {
        points:"",
    }

    onSubmit = evt => {
        evt.preventDefault();
        const newVoronoi= {
            points:this.state.points,
        }
        this.setState({newVoronoi});
    }

    onChange = evt => {
        this.setState({[evt.target.name]: evt.target.value})
    }

    render(){
        return(
        <div className="controller">
        <form onSubmit={this.onSubmit}>
            <label htmlFor="pixelInput">number of points:</label>
            <input id="pixelInput" name="points" onChange={this.onChange} value = {this.state.points}/>
            <button type="submit">draw!</button>
        </form>
        {<Viz voronoi={this.state.points}/>}
      </div>
        )
    }
}
