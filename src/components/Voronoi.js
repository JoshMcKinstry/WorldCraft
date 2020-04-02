import * as d3 from 'd3';
import {Delaunay} from 'd3-delaunay';

const draw = (props) =>{
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	const width = parseInt(w,10);
	const height = parseInt(h,10);

	const n = props.voronoi;
	const particles = Array.from({length:n}, () => [{x: Math.random() * width , y:Math.random() * height}]);
	const delaunay = Delaunay.from(particles);
	const voronoi = delaunay.voronoi([0.5,0.5,width-0.5,height-0.5]);
	
	var lineData = [{ "x": 1.5,   "y": 5},  { "x": 20,  "y": 20},
                  { "x": 40,  "y": 10}, { "x": 60.5486345,  "y": 40},
                  { "x": 80,  "y": 5},  { "x": 100, "y": 60.5648947}];

				
	console.log(lineData);
	console.log(particles);
	

	const canvas = d3.select('.voronoi').append('svg')
      .attr('height', h)
	  .attr('width', w)
	  .attr('id', 'svg-viz');

	const lineFunc = d3.line()
		.x(function(d) {return d.x;})
		.y(function(d) {return d.y;});

	const line = canvas.append('path')
		.attr('d', lineFunc(particles))
		.attr("stroke", "black")
		.attr("stroke-width", 1)
		.attr("fill", "none");

};

export default draw;