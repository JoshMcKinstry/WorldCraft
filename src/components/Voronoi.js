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
      .attr('height', h)
	  .attr('width', w)
	  .attr('id', 'canvas-viz');

	const svg = document.getElementById("voronoi");

	const context = svg.getContext('2d');

	console.log(context);

	context.clearRect(0,0,width,height);
	context.beginPath();
	voronoi.render(context);
    context.strokeStyle = "#ccc";
	context.stroke();
	
	
	/*const lineFunc = d3.line()
		.x(function(d) {return d.x;})
		.y(function(d) {return d.y;});*/

	const path = canvas.append('path')
		.data(particles)
		.attr("stroke", "black")
		.attr("stroke-width", 1)
		.attr("fill", "none");


};

export default draw;