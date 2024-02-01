import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"

const MenuTile = (props) => {
    const className = "aspect-square border-4 border-slate-500"
    return <div className={className}{...props}>
        <Draggable type={Dragtype.MenuTile}>
            {props.children}
        </Draggable>
    </div>
}

export default MenuTile