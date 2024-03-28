import { useDrag, useDrop } from "react-dnd"
import Dragtype from "./Dragtype"
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { getEmptyImage } from "react-dnd-html5-backend"
import ContextMenu from "../components/ContextMenu"
import { useDelete, useRename } from "../components/utils"
import { SharedContext } from "../App"

const Draggable = ({ type = Dragtype.MenuTile, dragid, id, children, left = 0, top = 0, className = "", initial, name, canDrag }) => {
    const ref = useRef()
    const [newLeft, setNewLeft] = useState(0)
    const [newTop, setNewTop] = useState(0)
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const rename = useRename();
    const remove = useDelete();
    const { activeScreen } = useContext(SharedContext)

    useLayoutEffect(() => {
        const { width, height } = ref.current
            ? ref.current.getBoundingClientRect() : { width: 0, height: 0 }
        setWidth(before => ref.current ? width : before)
        setHeight(before => ref.current ? height : before)
        setNewLeft(left - (initial ? width / 2 : 0))
        setNewTop(top - (initial ? height / 2 : 0))
    }, [initial, left, top])

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type,
        canDrag: type === Dragtype.MenuTile || type === Dragtype.Moveable || canDrag,
        item: { dragid, id, left: newLeft, top: newTop, width, height, name, canDrag },
        collect: (monitor, _) => ({
            isDragging: monitor.isDragging()
        })
    }), [type, dragid, id, newLeft, newTop, width, height, canDrag, name])

    // hard-coded drop then addition function
    const [, drop] = useDrop(() => ({
        accept: Dragtype.Testing,
        drop: (item) => {
            let num = parseInt(name)
            num++
            rename(activeScreen, dragid, num.toString())
            remove(activeScreen, item.dragid)
        }
    }), [name])
    // testing screen getting overwritten
    // item must be added before drop target for drop to be detected

    useEffect(() => {
        if (type !== Dragtype.MenuTile)
            preview(getEmptyImage(), { captureDraggingState: true })
    }, [preview, type])

    return <div
        ref={e => { if (!isDragging) drop(e); drag(e); ref.current = e }}
        onClick={() => ref.current.focus()}
        tabIndex={canDrag ? "0" : undefined}
        style={{ left: newLeft, top: newTop }}
        className={`${className} cursor-move ${type === Dragtype.Moveable ? "focus:outline-dotted focus:outline-[3px]" : ""}`}>
        {children}
        <span>{name}</span>
        {type === Dragtype.Moveable ? <ContextMenu id={dragid} /> : null}
    </div>
}

export default Draggable
