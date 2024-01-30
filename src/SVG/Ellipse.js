/**
 * 
 * @param rx x radius
 * @param ry y radius
 * @param x x coordinate (from center)
 * @param y y coordinate (from center)
 */

const Ellipse = (props) => {
    return (<ellipse cx={props.x} cy={props.y} {...props}/>)
}

export default Ellipse