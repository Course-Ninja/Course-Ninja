import { createElement, useCallback, useContext, useRef } from "react"
import { useDrop } from "react-dnd"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import { v4 as uuid } from "uuid"
import ContextMenu, { MENU_ID } from "../components/ContextMenu"
import { useContextMenu } from "react-contexify"
import { Elements } from "../App"

const Whiteboard = (props) => {
    const tileSize = 150 // arbitrary value for center of tile, remove once better method is found
    const className = "rounded-md border-4 border-slate-500 col-span-3 flex items-center justify-center relative"
    const { elements, setElements } = useContext(Elements)
    const ref = useRef(null)

    const addElement = useCallback(
        ({ id, obj }, left, top) => {
            setElements(elems => ({ ...elems, [id ? id : uuid()]: { obj, left, top } }))
        }, [setElements]
    )

    const moveElement = useCallback(
        ({ id, obj }, left, top) => {
            setElements(elems => ({ ...elems, [id]: { obj, left, top } }))
        }, [setElements]
    )

    const [, drop] = useDrop(() => ({
        drop: (item, monitor) => {
            const delta = monitor.getClientOffset()
            const left = Math.round(delta.x - tileSize)
            const top = Math.round(delta.y - tileSize)
            switch (monitor.getItemType()) {
                case Dragtype.MenuTile:
                    addElement(item, left, top)
                    return undefined
                case Dragtype.Moveable:
                    // const deltamove = monitor.getDifferenceFromInitialOffset()
                    // const leftmove = Math.round(item.left + deltamove.x)
                    // const topmove = Math.round(item.top + deltamove.y)
                    // moveElement(item, leftmove, topmove)
                    moveElement(item, left, top)
                    return undefined
                default:
            }
        },
        accept: [Dragtype.MenuTile, Dragtype.Moveable]
    }))

    const { show } = useContextMenu({ id: MENU_ID })
    const handleContextMenu = (event, id) => {
        show({ event, id })
    }

    return (
        <div ref={
            el => {
                drop(el)
                ref.current = el
            }
        } className={className} {...props}>
            {Object.entries(elements).length ? Object.entries(elements).map(
                ([id, { obj: { type, props }, left, top }], key) =>
                    <div onContextMenu={event => handleContextMenu(event, id)} key={key}>
                        <Draggable dragid={id} // for element movement
                            className="fixed size-fit" style={{ left, top }} // absolute positioning on whiteboard
                            left={left} top={top} // pass coordinates to Draggable
                            type={Dragtype.Moveable} //drag type
                        >
                            {createElement(type, { ...props })}
                        </Draggable>
                        <ContextMenu id={id}/>
                    </div>
            ) : "Whiteboard"}
        </div>
    )
}

export default Whiteboard