import Button from "../components/Button"
import TileContainer from "../components/TileContainer"

const ToolboxTab = () => {
    const handleClick = () => {
        alert("Hi")
    }
    return (
        <TileContainer>
            <Button onClick={handleClick} disabled={true}>
                <p className="border-1 border-stone-950">
                    Button
                </p>
            </Button>
        </TileContainer>
    )
}

export default ToolboxTab