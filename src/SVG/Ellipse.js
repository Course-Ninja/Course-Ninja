/**
 * 
 * @param rx x radius
 * @param ry y radius
 * @param x x coordinate (from center)
 * @param y y coordinate (from center)
 */

import SVGWrapper from "./SVGWrapper"

const Ellipse = (props) => {
    return <SVGWrapper>
        <ellipse cx={props.x} cy={props.y} {...props} />
    </SVGWrapper>
}

export default Ellipse