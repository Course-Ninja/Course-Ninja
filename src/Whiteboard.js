import { createElement, useCallback, useRef, useState } from "react"
import { useDrop } from "react-dnd"

const Whiteboard = (props) => {
    const className = "rounded-md border-4 border-slate-500 col-span-3 flex items-center justify-center"
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
            const left = Math.round(delta.x - ref.current.offsetLeft)
            const top = Math.round(delta.y)
            addElement(item.obj, left, top)
        },
        accept: props.accepttype
    }))

    return (
        <div ref={
            el => {
                drop(el)
                ref.current = el
            }
        } className={className}>
            <svg className="w-full h-full">
                {elements.map(
                    ({ element: { type, props }, left, top }, key = {}) => {
                        const newProps = {...props}
                        newProps.x = left
                        newProps.y = top
                        return createElement(type, { ...newProps, key: key })
                    }
                )}
            </svg>
        </div>
    )
}

export default Whiteboard