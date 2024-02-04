import { useCallback, useContext, useEffect } from "react"
import { useDrop } from "react-dnd"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import { v4 as uuid } from "uuid"
import ContextMenu from "../components/ContextMenu"
import { useContextMenu } from "react-contexify"
import { ElementsContext } from "../App"

const Whiteboard = ({ children, width }) => {
    const className = "rounded-md border-4 border-slate-500 w-3/4 flex items-center justify-center relative"
    const { elements, setElements, objRef } = useContext(ElementsContext)
    // const ref = useRef(null)

    const addElement = useCallback(
        ({ dragid, id }, left, top) => {
            setElements(elems => ({ ...elems, [dragid ? dragid : uuid()]: { id, left, top, initial: !dragid } }))
        }, [setElements]
    )

    const [, drop] = useDrop({
        drop: (item, monitor) => {
            var delta, left, top
            switch (monitor.getItemType()) {
                case Dragtype.MenuTile:
                    delta = monitor.getClientOffset()
                    left = delta.x
                    top = delta.y
                    addElement(item, Math.round(left), Math.round(top))
                    return undefined
                case Dragtype.Moveable:
                    delta = monitor.getDifferenceFromInitialOffset()
                    left = delta.x
                    top = delta.y
                    addElement(item, Math.round(item.left + left), Math.round(item.top + top))
                    return undefined
                default:
            }
        },
        accept: [Dragtype.MenuTile, Dragtype.Moveable]
    })

    const { show } = useContextMenu()
    const handleContextMenu = (event, id) => {
        show({ event, id })
    }

    useEffect(() => {
        window.onbeforeunload = () => Object.entries(elements).length ? true : undefined
    }, [elements])

    return (
        <div ref={drop} className={className} style={{ width }}>
            {Object.entries(elements).length ? Object.entries(elements).map(
                ([dragid, obj], key) =>
                    <div onContextMenu={event => handleContextMenu(event, dragid)} key={key}>
                        <Draggable dragid={dragid} // for element movement
                            {...obj}
                            className="fixed size-fit" // absolute positioning on whiteboard
                            // id={id}
                            // key={key}
                            // left={left} top={top} // pass coordinates to Draggable
                            // initial={initial}
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