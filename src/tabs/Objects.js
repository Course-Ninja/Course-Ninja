import Draggable from "../Draggable"
import Circle from "../SVG/Circle"
import Square from "../SVG/Square"
import MenuTile from "../components/MenuTile"
import Dragtype from "../Dragtype"

const Objects = () => {
    const className = "grid grid-cols-2 auto-rows-min overflow-auto"
    return (
        <div className={className}>
            <MenuTile>
                <Draggable type={Dragtype.MenuTile}>
                    <Circle x="50" y="50" r="25" style={{ "fill": "purple" }} />
                </Draggable>
            </MenuTile>
            <MenuTile>
                <Draggable type={Dragtype.MenuTile}>
                    <Square l="50" x="50" y="50" fill="red" id="red-square" />
                </Draggable>
            </MenuTile>
            <MenuTile>
                <Draggable type={Dragtype.MenuTile}>
                    <Circle x="20" y="50" r="50" style={{ "fill": "blue" }} />
                </Draggable>
            </MenuTile>
        </div>
    )
}

export default Objects