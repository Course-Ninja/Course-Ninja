import Ellipse from "./Ellipse"

/**
 * 
 * @param d diameter, this has precedencee over r (radius)
 * @param r radius, ignored if d (diameter) is present
 * @param x x coordinate (from center)
 * @param y y coordinate (from center)
 */

const Circle = (props) => {
    return <Ellipse rx={props.d ? props.d/2 : props.r} ry={props.d ? props.d/2 : props.r} {...props}/>
}

export default Circle