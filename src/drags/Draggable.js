import { useDrag } from "react-dnd"
import Dragtype from "./Dragtype"

const Draggable = ({ type = Dragtype.MenuTile, dragid, id, children, left, top, className }) => {
    const [collected, drag, dragpreview] = useDrag(() => ({
        type,
        item: { dragid, id, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [type, dragid, id, left, top])

    return (
        <div ref={collected.isDragging ? dragpreview : drag} className={`${className} cursor-move`} style={{ left, top }}>
            {children}
        </div>
    )
}

export default Draggable