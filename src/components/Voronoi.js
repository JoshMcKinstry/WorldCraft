import * as d3 from 'd3';
import {Delaunay} from 'd3-delaunay';

const draw = (props) =>{
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	const width = parseInt(w,10);
	const height = parseInt(h,10);
	

   const svg= d3.select('.voronoi').append('svg')
      .attr('height', h)
      .attr('width', w)
	  .attr('id', 'svg-viz');

	const n = props.voronoi;
	const num = parseInt(n,10);
	const particles = Array.from({length: num}, () => [Math.random() * width, Math.random() * height]);
    const delaunay = Delaunay.from(particles);
	const voronoi = delaunay.voronoi([0.5,0.5,width-0.5,height-0.5]);
	console.log(voronoi);

	svg.selectAll(".polygon")
    	.data(voronoi)
    	.enter().append("path")
  		.attr('class','svg-viz')
    	.attr("voronoi",function(voronoi){return "M" + voronoi.join("L") + "Z";})
    	.datum(function(voronoi, i) { return voronoi.point; })
    	.attr("class", function(voronoi,i) { return "voronoi " + voronoi.id; })
		.style("stroke", "#000");

	
};

export default draw;