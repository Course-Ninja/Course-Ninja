import { createElement, useCallback, useRef, useState } from "react"
import { useDrop } from "react-dnd"
import Draggable from "./Draggable"
import Dragtype from "./Dragtype"

const Whiteboard = (props) => {
    const className = "rounded-md border-4 border-slate-500 col-span-3 flex items-center justify-center relative"
    var [elements, setElements] = useState([])
    const ref = useRef(null)

    const addElement = useCallback(
        (element, left, top) => {
            elements = [...elements, { element, left, top }]
            setElements(elements)
        }, [elements, setElements]
    )

    const [, drop] = useDrop(() => ({
        drop: (item, monitor) => {
            const delta = monitor.getClientOffset()
            const left = Math.round(delta.x)
            const top = Math.round(delta.y)
            addElement(item.obj, left, top)
        },
        accept: [Dragtype.MenuTile, Dragtype.Moveable]
    }))

    return (
        <div ref={
            el => {
                drop(el)
                ref.current = el
            }
        } className={className}>
            {elements.map(
                ({ element: { type, props }, left, top }, key = {}) => {
                    const newProps = { ...props }
                    newProps.style = {...newProps.style, left, top}
                    return <Draggable key={key} className="fixed" style={newProps.style} type={Dragtype.Moveable}>{createElement(type, {...newProps})}</Draggable>
                }
            )}
        </div>
    )
}

export default Whiteboard