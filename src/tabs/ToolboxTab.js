import Button from "../components/Button"
import Text from "../components/Text"
import TileContainer from "../components/TileContainer"
import Variable from "../components/Variable"

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
            <Text/>
            <Variable/>
        </TileContainer>
    )
}

export default ToolboxTab
