import Circle from "../SVG/Circle"
import Square from "../SVG/Square"
import TileContainer from "../components/TileContainer"

const ShapesTab = () => {
    return (
        <TileContainer>
            <Circle x="50" y="50" r="25" style={{ "fill": "purple" }} />
            <Square l="50" x="50" y="50" style={{ fill: "red" }} />
            <Circle x="20" y="50" r="50" style={{ "fill": "blue" }} />
            <Circle x="50" y="0" r="50" style={{ "fill": "green" }} />
            <Circle x="50" y="50" r="25" style={{ "fill": "purple" }} />
            <Square l="50" x="50" y="50" style={{ fill: "red" }} />
            <Circle x="20" y="50" r="50" style={{ "fill": "blue" }} />
            <Circle x="50" y="0" r="50" style={{ "fill": "green" }} />
            <Circle x="50" y="50" r="25" style={{ "fill": "purple" }} />
            <Square l="50" x="50" y="50" style={{ fill: "red" }} />
            <Circle x="20" y="50" r="50" style={{ "fill": "blue" }} />
            <Circle x="50" y="0" r="50" style={{ "fill": "green" }} />
            <Circle x="50" y="50" r="25" style={{ "fill": "purple" }} />
            <Square l="50" x="50" y="50" style={{ fill: "red" }} />
            <Circle x="20" y="50" r="50" style={{ "fill": "blue" }} />
            <Circle x="50" y="0" r="50" style={{ "fill": "green" }} />
        </TileContainer>
    )
}

export default ShapesTab