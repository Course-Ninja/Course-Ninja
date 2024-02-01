import { createElement, useCallback, useRef, useState } from "react"
import { useDrop } from "react-dnd"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import { v4 as uuid } from "uuid"

const Whiteboard = (props) => {
    const tileSize = 150 // arbitrary value for center of tile, remove once better method is found
    const className = "rounded-md border-4 border-slate-500 col-span-3 flex items-center justify-center relative"
    const [elements, setElements] = useState({})
    const ref = useRef(null)

    const addElement = useCallback(
        ({ id, obj }, left, top) => {
            setElements(elems => { return { ...elems, [id ? id : uuid()]: { obj, left, top } } })
        }, [setElements]
    )

    const moveElement = useCallback(
        ({ id, obj }, left, top) => {
            setElements(elems => { return { ...elems, [id]: { obj, left, top } } })
        }, [setElements]
    )

    const [, drop] = useDrop(() => ({
        drop: (item, monitor) => {
            const delta = monitor.getClientOffset()
            const left = Math.round(delta.x - tileSize)
            const top = Math.round(delta.y - tileSize)
            switch (monitor.getItemType()) {
                case Dragtype.MenuTile:
                    // console.log("Create:", item.id)
                    addElement(item, left, top)
                    return undefined
                case Dragtype.Moveable:
                    // const deltamove = monitor.getDifferenceFromInitialOffset()
                    // const leftmove = Math.round(item.left + deltamove.x)
                    // const topmove = Math.round(item.top + deltamove.y)
                    // console.log("Move:", item.id)
                    // moveElement(item, leftmove, topmove)
                    moveElement(item, left, top)
                    return undefined
                default:
            }
        },
        accept: [Dragtype.MenuTile, Dragtype.Moveable]
    }))

    return (
        <div ref={
            el => {
                drop(el)
                ref.current = el
            }
        } className={className} {...props}>
            {Object.entries(elements).map(
                ([id, { obj: { type, props }, left, top }], key) => {
                    return (
                        <Draggable dragid={id} // for element movement
                            key={key} // array map key
                            className="fixed" style={{ left, top }} // absolute positioning on whiteboard
                            left={left} top={top} // pass coordinates to Draggable
                            type={Dragtype.Moveable} /*drag type*/>
                            {createElement(type, { ...props })}
                        </Draggable>
                    )
                })
            }
        </div>
    )
}

export default Whiteboard