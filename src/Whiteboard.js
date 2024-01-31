import { createElement, useCallback, useRef, useState } from "react"
import { useDrop } from "react-dnd"
import Draggable from "./Draggable"
import Dragtype from "./Dragtype"

const Whiteboard = (props) => {
    const tileSize = 150 // arbitrary value for center of tile, remove once better method is found
    const className = "rounded-md border-4 border-slate-500 col-span-3 flex items-center justify-center relative"
    const [elements, setElements] = useState([])
    const ref = useRef(null)

    const addElement = useCallback(
        (element, left, top) => {
            setElements(elems => [...elems, { element, left, top }])
        }, [setElements]
    )

    const [, drop] = useDrop(() => ({
        drop: (item, monitor) => {
            switch (monitor.getItemType()) {
                case Dragtype.MenuTile:
                    const delta = monitor.getClientOffset()
                    const left = Math.round(delta.x - tileSize)
                    const top = Math.round(delta.y - tileSize)
                    addElement(item.obj, left, top)
                    return undefined
                case Dragtype.Moveable:
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
            {elements.map(
                ({ element: { type, props }, left, top }, key) => {
                    return (
                        <Draggable key={key} className="fixed" style={{ left, top }} type={Dragtype.Moveable}>
                            {createElement(type, { ...props })}
                        </Draggable>
                    )
                }
            )}
        </div>
    )
}

export default Whiteboard