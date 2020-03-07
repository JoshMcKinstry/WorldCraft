//source:https://www.youtube.com/watch?v=jv0rjLaVw5Q&t
import * as d3 from 'd3';

//VORONOI

const draw = (props) =>{	
	'use strict';
	const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	
	d3.select('.viz').append('svg')
	.attr('height',h)
	.attr('weight',w)
	.attr('id','svg-viz')
	
	var nPoints = props.points;
	
	var points = d3.range(nPoints).map(function(d){return [Math.random() * w, Math.random() * h]; }); 

	var voronoi = d3.voronoi().extent([[0,0],[w,h]]);

	var polygons = voronoi.polygons(points);

	const path = d3.select('.viz').append("g").selectAll("path").data(polygons).enter()
		.append("path")
		.attr("d",polyToPath);
		
	const circles = d3.selectAll("circle").data(points).enter()
		.append("circle")
		.attr("cx",function(d){return d[0]})
		.attr("cy", function(d){return d[1]})
		.attr("r",2);
		

	function polyToPath(polygon){
		return polygon ? "M" + polygon.join("L") + "Z" : null;
	}
	
}

export default draw;