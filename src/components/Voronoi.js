import * as d3 from 'd3';
import {Delaunay} from 'd3-delaunay';

const draw = (props) =>{
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	const width = parseInt(w,10);
	const height = parseInt(h,10);

	const n = props.voronoi;
	const num = parseInt(n,10);
	const particles = Array.from({length: num}, () => [Math.random() * width, Math.random() * height]);
	const delaunay = Delaunay.from(particles);
	const voronoi = delaunay.voronoi([0.5,0.5,width-0.5,height-0.5]);

	d3.select('.voronoi').append('svg')
      .attr('height', h)
	  .attr('width', w)
	  .data(voronoi)
	  .attr('id', 'svg-viz');

	const circles = d3.select('.svg').selectAll('circle')
		.data(particles)
		.enter()
		.append('svg:circle')
		.attr('r' , "4px")
		.style('fill', 'black')
		.on('tick', ticked);
		
	function ticked(){
		circles
		.attr('cx', d => d.x)
		.attr('cy', d => d.y);

	}

};

export default draw;