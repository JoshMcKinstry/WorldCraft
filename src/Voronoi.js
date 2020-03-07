//source:https://www.youtube.com/watch?v=jv0rjLaVw5Q&t
import * as d3 from 'd3';

//VORONOI

const draw = (props) =>{	 
	const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	
	d3.select('.viz').append('svg')
	.attr('height',h)
	.attr('weight',w)
	.attr('id','svg-viz')
	
	const nPoints = props.points;

	const color = function() {return d3.interpolateOranges(Math.random())};

	const points = d3.range(nPoints).map(function(d){return [Math.random() * w, Math.random() * h]; }); 

	const voronoi = d3.voronoi().extent([[0,0],[w,h]]);


	const polygons = voronoi.polygons(points);
		d3.select('.viz').append("g").selectAll("path").data(polygons).enter()
		.append("path")
		.attr("d",polyToPath)
		.attr("fill", color);

	const simulation = d3.forceSimulation()
		.force('x', d3.forceX(w/3).strength(0.05))
		.force('y', d3.forceY(h/3).strength(0.05))

	const circles = d3.select('#svg-viz').selectAll("points")
		.data(points)
		.enter()
		.append("svg:points")
		.attr("cx",function(d){return d[0]})
		.attr("cy", function(d){return d[1]})
		.attr("r",2);
		
	simulation.nodes(props.points)
	.on('tick', ticked)

	function ticked(){
		circles
		.attr('cx', d => d.x)
		.attr('cy', d => d.y)
	}

	function polyToPath(polygon){
		return polygon ? "M" + polygon.join("L") + "Z" : null;
	}
	
}

export default draw;