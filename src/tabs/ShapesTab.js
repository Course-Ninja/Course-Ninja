import Circle from "../SVG/Circle"
import Square from "../SVG/Square"
import MenuTile from "../components/MenuTile"

const ShapesTab = () => {
    const className = "grid grid-cols-2 auto-rows-min overflow-auto"
    return (
        <div className={className}>
            <MenuTile>
                <Circle x="50" y="50" r="25" style={{ "fill": "purple" }} />
            </MenuTile>
            <MenuTile>
                <Square l="50" x="50" y="50" fill="red"/>
            </MenuTile>
            <MenuTile>
                <Circle x="20" y="50" r="50" style={{ "fill": "blue" }} />
            </MenuTile>
            <MenuTile>
                <Circle x="50" y="0" r="50" style={{ "fill": "green" }} />
            </MenuTile>
        </div>
    )
}

export default ShapesTab