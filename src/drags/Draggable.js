import { useDrag } from "react-dnd"
import Dragtype from "./Dragtype"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { getEmptyImage } from "react-dnd-html5-backend"

const Draggable = ({ type = Dragtype.MenuTile, dragid, id, children, left = 0, top = 0, className, initial }) => {
    const ref = useRef()
    const [newLeft, setNewLeft] = useState(0)
    const [newTop, setNewTop] = useState(0)

    const [, drag, preview] = useDrag(() => ({
        type,
        item: { dragid, id, left: newLeft, top: newTop }
    }), [type, dragid, id, newLeft, newTop])

    useLayoutEffect(() => {
        const { width, height } = (ref.current && initial)
            ? ref.current.getBoundingClientRect() : { width: 0, height: 0 }
        setNewLeft(left - width / 2)
        setNewTop(top - height / 2)
    }, [initial, left, top])

    useEffect(() => {
        if (type === Dragtype.Moveable)
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [preview, type])

    return <div ref={e => {
            drag(e)
            ref.current = e
        }} onClick={() => ref.current.focus()}
        tabIndex="0" style={{ left: newLeft, top: newTop }}
            className={`${className} cursor-move ${type === Dragtype.Moveable ? "focus:outline-dotted focus:outline-[3px]" : ""}`}>
            {children}
        </div>
}

export default Draggable