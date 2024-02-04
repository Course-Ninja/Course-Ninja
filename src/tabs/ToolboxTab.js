import MenuTile from "../components/MenuTile"
import { gridLayout } from "../components/utils"
import Button from "../components/Button"

const ToolboxTab = () => {
    const handleClick = () => {
        alert("Hi")
    }
    return (
        <div className={gridLayout}>
            <MenuTile id="button">
                <Button onClick={handleClick} disabled={true}>
                    <p className="border-1 border-stone-950">
                        Click me
                    </p>
                </Button>
            </MenuTile>
        </div>
    )
}

export default ToolboxTab