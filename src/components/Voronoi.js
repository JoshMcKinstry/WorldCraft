//source:https://www.youtube.com/watch?v=jv0rjLaVw5Q&t
import * as d3 from 'd3';
import {Delaunay} from 'd3-delaunay';

//DELAUNAY VORONOI
const draw = (props) =>{	 
	const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	d3.select('.viz').append('svg')
	.attr('height',h)
	.attr('width',w)
	.attr('id','svg-viz');
	
	const nPoints = props.points;

	//const color = function() {return d3.interpolateOranges(Math.random())};

	const points = Array.from({length: nPoints}, () => [Math.random() * w, Math.random() * h]); 
	
	const delaunay = Delaunay.from(points);
	const voronoi = delaunay.voronoi([0,0,w,h]);

	d3.select('#svg-viz').selectAll("voronoi")
		.data(props.points)
		.append('svg:circle')
		.attr("fill", "none")
		.attr("stroke", "#ccc")
		.attr("stroke-width", 1)
		.attr("d", voronoi.render())
		.enter();
		
		

}

export default draw;