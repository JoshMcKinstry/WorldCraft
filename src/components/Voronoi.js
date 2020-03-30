import * as d3 from 'd3';
import {Delaunay} from 'd3-delaunay';

const draw = (props) =>{
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	const width = parseInt(w,10);
	const height = parseInt(h,10);
	

    const svg = d3.select('.voronoi').append('svg')
      .attr('height', h)
      .attr('width', w)
	  .attr('id', 'svg-viz');

	const n = props.voronoi;
	const num = parseInt(n,10);
	const particles = Array.from({length: num}, () => [Math.random() * width, Math.random() * height]);
    const delaunay = Delaunay.from(particles);
	const voronoi = delaunay.voronoi(particles);
	
	//container that has voronoi cells to draw
	const cells = svg.append("svg:g")
		.attr("id", "cells")
    	.attr('fill','none')
    	.attr('stroke','#666')
		.attr('stroke-opacity',0);
		
	//assigns each point to g
	var g = cells.selectAll("g")
            .data(particles)
            .enter()
			.append("svg:g");

	//draw voronoi
	g.append("svg:path")
        .attr("class", "cell")
        .attr("d", function(d, i) {
            //m - pen down
            //voronoi[i],join('L') - draw lines joining each point in voronoi[i]
            //z - pen up
            return "M" + voronoi[i].join("L") + "Z";
        });
			

};

export default draw;