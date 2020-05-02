import React, {Component} from 'react';
import Viz from './Viz.js';
import './css/Controller.css';

export default class Controller extends Component {
    state = {
      points: '',
      toDraw: [],
    }

    onSubmit = (evt) => {
      evt.preventDefault();
      const newVoronoi= {
        points: this.state.points
      };
      this.setState({toDraw: [...this.state.toDraw, newVoronoi]});
    }

    onChange = (evt) => 
      this.setState({[evt.target.name]: evt.target.value});

    render(){
      return (
        <div className="controller">
          <form onSubmit={this.onSubmit} name = "voronoi" value = {this.state.points}>
            <label htmlFor="pixelInput">Number of points:</label>
            <input id="pixelInput" name="points" onChange={this.onChange} value = {this.state.points}/>
            <button name = "draw_button" type="submit" value = "Submit">Generate</button>
            {/*<button name = "relax_button" type = "click" value = "Relax">Relax</button>*/}
          </form>
          { this.state.toDraw.length ? <Viz voronoi={this.state.toDraw}/> : null}
        </div>
      );
    }

}

