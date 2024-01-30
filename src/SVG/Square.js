import Rectangle from "./Rectangle"

/**
 * 
 * @param l length
 * @param x x coordinate (from center)
 * @param y y coordinate (from center)
 */

const Square = (props) => {
    return <Rectangle w={props.l} h={props.l} {...props}/>
}

export default Square