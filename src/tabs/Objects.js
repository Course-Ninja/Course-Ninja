import Draggable from "../Draggable"
import Circle from "../SVG/Circle"
import Square from "../SVG/Square"

const Objects = () => {
    return <>
        <Draggable type="BOX">
            <Circle x="50" y="50" r="25" style={{ "fill": "purple" }} />
        </Draggable>
        <Draggable type="BOX">
            <Square l="50" x="50" y="50" fill="red" id="red-square" />
        </Draggable>
        <Draggable type="BOX">
            <Circle x="20" y="50" r="50" style={{ "fill": "blue" }} />
        </Draggable>
    </>
}

export default Objects