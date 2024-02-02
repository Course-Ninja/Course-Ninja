import Rectangle from "./Rectangle"
import SVGWrapper from "./SVGWrapper"

/**
 * 
 * @param l length
 * @param x x coordinate (from center)
 * @param y y coordinate (from center)
 */

const Square = (props) => {
    return <SVGWrapper>
        <Rectangle w={props.l} h={props.l} {...props} />
    </SVGWrapper>
}

export default Square