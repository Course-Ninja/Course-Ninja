import { useContext, useState, useEffect, useLayoutEffect, useRef } from "react"
import { useDrop } from "react-dnd"
import { useContextMenu } from "react-contexify"
import { v4 as uuid } from "uuid"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import ContextMenu from "../components/ContextMenu"
import { ElementsContext } from "../App"

const Whiteboard = ({ children }) => {
    const className = "rounded-md border-4 m-8 border-slate-500 flex flex-grow items-center justify-center relative bg-white"
    const { elements, setElements, objRef } = useContext(ElementsContext)
    const ref = useRef()
    const [boundingBox, setBoundingBox] = useState({})

    const [, drop] = useDrop({
        drop: (item, monitor) => {
            if (monitor.getItemType() === Dragtype.MenuTile) {
                const delta = monitor.getClientOffset()
                var left = delta.x
                var top = delta.y
                const { id } = item
                setElements(elems => ({ ...elems, [uuid()]: { id, left, top, initial: true } }))
            }
        },
        hover: (item, monitor) => {
            if (monitor.getItemType() === Dragtype.Moveable) {
                const delta = monitor.getDifferenceFromInitialOffset()
                var left = delta.x + item.left
                var top = delta.y + item.top
                const { dragid, id, width, height } = item
                const right = left + width
                const bottom = top + height

                if (left < boundingBox.left) left = boundingBox.left
                if (right > boundingBox.right) left = boundingBox.right - width
                if (top < boundingBox.top) top = boundingBox.top
                if (bottom > boundingBox.bottom) top = boundingBox.bottom - height
                setElements(elems => ({ ...elems, [dragid]: { id, left, top, initial: false } }))
            }
        },
        accept: [Dragtype.MenuTile, Dragtype.Moveable]
    })

    const { show } = useContextMenu()

    useEffect(() => {
        window.onbeforeunload = () => Object.entries(elements).length ? true : undefined
    }, [elements])

    useLayoutEffect(() => {
        const node = ref.current
        if (node) {
            setBoundingBox({
                top: node.offsetTop,
                left: node.offsetLeft,
                right: node.offsetLeft + node.clientWidth,
                bottom: node.offsetTop + node.clientHeight
            })
        }
    }, [setBoundingBox])

    return (
        <div ref={e => {
            drop(e)
            ref.current = e
        }} className={className}>
            {Object.entries(elements).length ? Object.entries(elements).map(
                ([dragid, obj], key) =>
                    <div onContextMenu={event => show({ event, id: dragid })} key={key}>
                        <Draggable dragid={dragid} // for element movement
                            {...obj}
                            className="fixed" // absolute positioning on whiteboard
                            type={Dragtype.Moveable} //drag type
                        >
                            {objRef[obj.id]}
                        </Draggable>
                        <ContextMenu id={dragid} />
                    </div>
            ) : children}
        </div>
    )
}

export default Whiteboard