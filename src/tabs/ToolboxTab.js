import MenuTile from "../components/MenuTile"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import { gridLayout } from "../windows/EditorPane"

const ToolboxTab = () => {
    return (
        <div className={gridLayout}>
            <MenuTile>
                <Draggable type={Dragtype.MenuTile}>
                    <button disabled={false}>
                        <p className="border-1 border-stone-950">
                            Click me
                        </p>
                    </button>
                </Draggable>
            </MenuTile>
        </div>
    )
}

export default ToolboxTab