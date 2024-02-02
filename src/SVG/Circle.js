import Ellipse from "./Ellipse"
import SVGWrapper from "./SVGWrapper"

/**
 * 
 * @param d diameter, this has precedencee over r (radius)
 * @param r radius, ignored if d (diameter) is present
 * @param x x coordinate (from center)
 * @param y y coordinate (from center)
 */

const Circle = (props) => {
    return <SVGWrapper>
        <Ellipse rx={props.d ? props.d / 2 : props.r} ry={props.d ? props.d / 2 : props.r} {...props} />
    </SVGWrapper>
}

export default Circle