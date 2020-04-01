import * as d3 from 'd3';
import {Delaunay} from 'd3-delaunay';

const draw = (props) =>{
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	const width = parseInt(w,10);
	const height = parseInt(h,10);

    d3.select('.voronoi').append('svg')
      .attr('height', h)
      .attr('width', w)
	  .attr('id', 'svg-viz');
	
	const n = props.voronoi;
	const num = parseInt(n,10);
	const particles = Array.from({length: num}, () => [Math.random() * width, Math.random() * height]);
	const delaunay = Delaunay.from(particles);
	const voronoi = delaunay.voronoi([0.5,0.5,width-0.5,height-0.5]);
	const simulation = d3.forceSimulation();

	simulation.nodes(particles)
		.on('tick',ticked);

	const line = d3.select('#voronoi').selectAll('line')
		.data(voronoi)
		.attr("d",function(d){return "M" + d.join("L") + "Z";})
    	.datum(function(d, i) { return d.point; })
		.attr("class", function(d,i) { return "d " + d.id; })
		.enter().append('svg:line')
  		.attr('class','svg-viz')
		.style("stroke", "#000");

	console.log(line);

};

export default draw;