import { useContext, useEffect } from "react"
import { useDrop } from "react-dnd"
import { useContextMenu } from "react-contexify"
import { v4 as uuid } from "uuid"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import ContextMenu from "../components/ContextMenu"
import { ElementsContext } from "../App"

const Whiteboard = ({ children, width }) => {
    const className = "rounded-md border-4 border-slate-500 w-3/4 flex items-center justify-center relative"
    const { elements, setElements, objRef } = useContext(ElementsContext)

    const [, drop] = useDrop({
        drop: (item, monitor) => {
            var delta, left, top
            switch (monitor.getItemType()) {
                case Dragtype.MenuTile:
                    delta = monitor.getClientOffset()
                    left = delta.x
                    top = delta.y
                    break
                case Dragtype.Moveable:
                    delta = monitor.getDifferenceFromInitialOffset()
                    left = delta.x + item.left
                    top = delta.y + item.top
                    break
                default:
            }
            const { dragid, id } = item
            setElements(elems => ({ ...elems, [dragid ? dragid : uuid()]: { id, left, top, initial: !dragid } }))
        },
        hover: (item, monitor) => {
            if (monitor.getItemType() === Dragtype.Moveable) {
                const delta = monitor.getDifferenceFromInitialOffset()
                const left = delta.x + item.left
                const top = delta.y + item.top
                const { dragid, id } = item
                setElements(elems => ({ ...elems, [dragid ? dragid : uuid()]: { id, left, top, initial: !dragid } }))
            }
        },
        accept: [Dragtype.MenuTile, Dragtype.Moveable]
    })

    const { show } = useContextMenu()

    useEffect(() => {
        window.onbeforeunload = () => Object.entries(elements).length ? true : undefined
    }, [elements])

    return (
        <div ref={drop} className={className} style={{ width }}>
            {Object.entries(elements).length ? Object.entries(elements).map(
                ([dragid, obj], key) =>
                    <div onContextMenu={event => show({ event, id: dragid })} key={key}>
                        <Draggable dragid={dragid} // for element movement
                            {...obj}
                            className="fixed size-fit" // absolute positioning on whiteboard
                            type={Dragtype.Moveable} //drag type
                        >
                            {objRef[obj.id]}
                        </Draggable>
                        <ContextMenu id={dragid} />
                    </div>
            ) : children}
        </div>
    )
}

export default Whiteboard