import { useCallback, useContext, useEffect, useRef } from "react"
import { useDrop } from "react-dnd"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import { v4 as uuid } from "uuid"
import ContextMenu, { MENU_ID } from "../components/ContextMenu"
import { useContextMenu } from "react-contexify"
import { ElementsContext } from "../App"

const Whiteboard = ({ children, width }) => {
    const tileSize = 150 // arbitrary value for center of tile, remove once better method is found
    const className = "rounded-md border-4 border-slate-500 w-3/4 flex items-center justify-center relative"
    const { elements, setElements, objRef } = useContext(ElementsContext)
    const ref = useRef(null)

    const addElement = useCallback(
        ({ dragid, id }, left, top) => {
            setElements(elems => ({ ...elems, [dragid ? dragid : uuid()]: { id, left, top } }))
        }, [setElements]
    )

    const [, drop] = useDrop({
        drop: (item, monitor) => {
            var delta = monitor.getClientOffset()
            var left = delta.x
            var top = delta.y
            switch (monitor.getItemType()) {
                case Dragtype.MenuTile:
                    addElement(item, Math.round(left - tileSize), Math.round(top - tileSize))
                    return undefined
                case Dragtype.Moveable:
                    delta = monitor.getDifferenceFromInitialOffset()
                    left = delta.x
                    top = delta.y
                    // const leftmove = Math.round(item.left + deltamove.x)
                    // const topmove = Math.round(item.top + deltamove.y)
                    // console.log(`Left: ${item.left}, delta: ${deltamove.x} final: ${leftmove}`)
                    // console.log(`Top: ${item.top}, delta: ${deltamove.y} final: ${topmove}`)
                    // moveElement(item, leftmove, topmove)
                    console.log(`Left: ${item.left}, delta: ${delta.x} final: ${left}`)
                    console.log(`Top: ${item.top}, delta: ${delta.y} final: ${top}`)
                    addElement(item, Math.round(item.left + left), Math.round(item.top + top))
                    return undefined
                default:
            }
        },
        accept: [Dragtype.MenuTile, Dragtype.Moveable]
    })

    const { show } = useContextMenu({ id: MENU_ID })
    const handleContextMenu = (event, id) => {
        show({ event, id })
    }

    useEffect(() => {
        window.onbeforeunload = () => Object.entries(elements).length ? true : undefined
    }, [elements])

    return (
        <div ref={
            el => {
                drop(el)
                ref.current = el
            }
        } className={className} style={{ width }}>
            {Object.entries(elements).length ? Object.entries(elements).map(
                ([dragid, { id, left, top }], key) =>
                    <div onContextMenu={event => handleContextMenu(event, dragid)} key={key}>
                        <Draggable dragid={dragid} // for element movement
                            id={id}
                            key={key}
                            className="fixed size-fit" // absolute positioning on whiteboard
                            left={left} top={top} // pass coordinates to Draggable
                            type={Dragtype.Moveable} //drag type
                        >
                            {objRef[id]}
                        </Draggable>
                        <ContextMenu id={dragid} />
                    </div>
            ) : children}
        </div>
    )
}

export default Whiteboard