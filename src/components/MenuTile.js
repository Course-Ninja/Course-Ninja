import Draggable from "../drags/Draggable"

const MenuTile = (props) => {
    const className = "aspect-square border-4 border-slate-500 flex justify-center items-center"
    return <div className={className}{...props}>
        <Draggable className="size-full flex justify-center items-center">
            {props.children}
        </Draggable>
    </div>
}

export default MenuTile