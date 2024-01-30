/**
 * 
 * @param w width 
 * @param h height 
 * @param x x coordinate (from center)
 * @param y y coordinate (from center)
 */

const Rectangle = (props) => {
    const newProps = {...props}
    newProps.x -= props.w / 2
    newProps.y -= props.h / 2
    newProps.width = props.w
    newProps.height = props.h
    return <rect {...newProps}/>
}

export default Rectangle