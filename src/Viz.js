//viz strictly takes the information generated from controller 
//then uses d3 for da maths and to draw with it
import React, {useEffect} from 'react';
import draw from './Voronoi.js'
import * as d3 from 'd3';

const Viz = (props)=>{
    useEffect(()=>{
        d3.select('.viz > *').remove();
        draw(props)
    }, [props.shapes.length])
    return <div className = "viz"/>
}
export default Viz