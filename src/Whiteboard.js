import { createElement, useCallback, useState } from "react"
import { useDrop } from "react-dnd"

const Whiteboard = (props) => {
    var [elements, setElements] = useState([])

    const addElement = useCallback(
        (element, left, top) => {
            elements = [...elements, { element, left, top }]
            setElements(elements)
        }, [elements, setElements]
    )

    const [, drop] = useDrop(() => ({
        drop: (item, monitor) => {
            const delta = monitor.getSourceClientOffset()
            const left = Math.round(delta.x)
            const top = Math.round(delta.y)
            addElement(item.obj, left, top)
        },
        accept: props.accepttype
    }))

    return (
        <div ref={drop} className={props.className}>
            <svg viewBox="0 0 100 100">
                {elements.map(
                    ({ element: { type, props }, left, top }, key = {}) => (createElement(type, {...props, key: key})
                        // createElement(type, {
                        //     fill: props.fill,
                        //     width: props.width,
                        //     height: props.height,
                        //     x: left / 100,
                        //     y: top / 100,
                        //     key: key
                        // })
                    )
                )}
            </svg>
        </div>
    )
}

export default Whiteboard