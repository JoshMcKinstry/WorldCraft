import {Delaunay} from 'd3-delaunay';

const draw = (props) =>{
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	const width = parseInt(w,10);
	const height = parseInt(h,10);

	const n = props.voronoi;
	const value = n[n.length-1].points; //calling last in the array to be new points
	const particles = Array.from({length:value},() => [Math.random() * width , Math.random() * height]);
	const delaunay = Delaunay.from(particles);
	const voronoi = delaunay.voronoi([0.5,0.5,width-0.5,height-0.5]);

	//canvas element
	const svg = document.getElementById("voronoi");

	svg.width = width;
	svg.height = height;

	const context = svg.getContext('2d');

	context.clearRect(0,0,width,height); //clear previous image
	context.beginPath();
	voronoi.render(context);
	context.strokeStyle = "#000";
	context.stroke(); //final stroke to finish drawing voronoi
};

export default draw;