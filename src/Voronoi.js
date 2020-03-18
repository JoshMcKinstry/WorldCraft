//source:https://www.youtube.com/watch?v=jv0rjLaVw5Q&t
import * as d3 from 'd3';
import {Delaunay} from 'd3-delaunay';

//VORONOI

const draw = (props) =>{	 
	const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	const svg = d3.select('.viz').append('svg')
	.attr('height',h)
	.attr('weight',w)
	.attr('id','svg-viz');
	
	const nPoints = props.points;

	//const color = function() {return d3.interpolateOranges(Math.random())};

	const points = Array.from({length: nPoints}, () => [Math.random() * w, Math.random() * h]); 
	
	const delaunay = Delaunay.from(points);
	const voronoi = delaunay.voronoi([0,0,w,h]);

	const mesh = d3.select('#svg-viz')
		.attr("fill", "none")
		.attr("stroke", "#ccc")
		.attr("stroke-width", 1)
		.enter()
		.attr("d", voronoi.render());

	var count = 0;
	while (points.length>count){
		svg.append("voronoi")
		.attr("cx", points[count][0])
		.attr("cy", points[count][1])
		.attr("r", 1);
		count++;
	}
	mesh.attr("d",voronoi.render());
	

}

export default draw;