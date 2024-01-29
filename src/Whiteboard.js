import { useCallback, useState } from "react"
import { useDrop } from "react-dnd"

const Whiteboard = (props) => {
    const [boxes, setBoxes] = useState({})

    const moveBox = useCallback(
        (id, left, top) => {
            console.log(id, left, top)
            console.log(boxes)
            boxes[id] = {left, top}
            setBoxes(boxes)
        }, [boxes, setBoxes]
    )

    const [, drop] = useDrop(() => ({
        drop: (item, monitor) => {
            // console.log(item.obj)
            const delta = monitor.getSourceClientOffset()
            const left = Math.round(delta.x)
            const top = Math.round(delta.y)
            moveBox(item.id, left, top)
        },
        accept: props.accepttype
    }))
    return <div ref={drop} className={props.className}>{props.children}</div>
}

export default Whiteboard