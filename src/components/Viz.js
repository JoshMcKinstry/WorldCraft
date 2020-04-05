import React, { useEffect } from 'react';
import draw from './Voronoi.js';
import * as d3 from 'd3';


//fence like component to create a border between React and D3
//using React Hooks
const Viz = (props) => {
  useEffect(() => {
    d3.select('.voronoi > *').remove();
    draw(props);
  }, [props.voronoi.length]); 

  return <div>
    <canvas id = "voronoi">
    </canvas>
  </div>
}

export default Viz;