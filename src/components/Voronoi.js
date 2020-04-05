import * as d3 from 'd3';
import {Delaunay} from 'd3-delaunay';

const draw = (props) =>{
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	const width = parseInt(w,10);
	const height = parseInt(h,10);

	const n = props.voronoi;
	const particles = Array.from({length:n},() => [Math.random() * width , Math.random() * height]);
	const delaunay = Delaunay.from(particles);
	const voronoi = delaunay.voronoi([0.5,0.5,width-0.5,height-0.5]);

	const canvas = d3.select('.voronoi').append('canvas')
      .attr('height', height)
	  .attr('width', width)
	  .attr('id', 'canvas');

	const svg = document.getElementById("voronoi");

	const context = svg.getContext('2d');

	context.clearRect(0,0,width,height);
	
	context.beginPath();
	voronoi.render(context);
    context.strokeStyle = "#ccc";
	context.stroke();
};

export default draw;