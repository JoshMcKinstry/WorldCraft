import * as d3 from 'd3';
import {Delaunay} from 'd3-delaunay';

const draw = (props) =>{
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    d3.select('.viz').append('svg')
      .attr('height', h)
      .attr('width', w)
      .attr('id', 'svg-viz');

    const n = props.voronoi;
    const particles = Array.from({length: n}, () => Math.random * w, Math.random * h);
    console.log(particles);
    const delaunay = Delaunay.from(particles);
    const voronoi = delaunay.voronoi([0.5,0.5,w-0.5,h-0.5]);
    voronoi.render(particles);

}

export default draw;