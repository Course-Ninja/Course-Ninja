import Circle from "../SVG/Circle"
import Square from "../SVG/Square"
import MenuTile from "../components/MenuTile"
import { gridLayout } from "../components/utils"

const ShapesTab = () => {
    return (
        <div className={gridLayout}>
            <MenuTile id="purple-circle">
                <Circle x="50" y="50" r="25" style={{ "fill": "purple" }} />
            </MenuTile>
            <MenuTile id="red-square">
                <Square l="50" x="50" y="50" style={{ fill: "red" }} />
            </MenuTile>
            <MenuTile id="blue-cutoff-circle">
                <Circle x="20" y="50" r="50" style={{ "fill": "blue" }} />
            </MenuTile>
            <MenuTile id="green-semicircle">
                <Circle x="50" y="0" r="50" style={{ "fill": "green" }} />
            </MenuTile>
        </div>
    )
}

export default ShapesTab