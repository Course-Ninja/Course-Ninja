import { useContext, useEffect, useLayoutEffect, useRef } from "react"
import { useDrop } from "react-dnd"
import { useContextMenu } from "react-contexify"
import { v4 as uuid } from "uuid"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import ContextMenu from "../components/ContextMenu"
import { ElementsContext } from "../App"
import { objectEquals } from "../components/utils"

const Whiteboard = ({ children }) => {
    const className = "rounded-md border-4 m-8 border-slate-500 flex flex-grow items-center justify-center relative bg-white"
    const { elements, setElements, objRef, setBorder, border } = useContext(ElementsContext)
    const ref = useRef()

    const [, drop] = useDrop({
        drop: (item, monitor) => {
            if (monitor.getItemType() === Dragtype.MenuTile) {
                const delta = monitor.getClientOffset()
                const left = delta.x
                const top = delta.y
                const { id } = item
                setElements(elems => ({ ...elems, [uuid()]: { id, left, top, initial: true } }))
            }
        },
        hover: (item, monitor) => {
            if (monitor.getItemType() === Dragtype.Moveable) {
                const delta = monitor.getDifferenceFromInitialOffset()
                const left = delta.x + item.left
                const top = delta.y + item.top
                const { dragid, id } = item
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
            const newBorder = { top: node.offsetTop, left: node.offsetLeft,
                right: window.innerWidth - node.offsetLeft - node.clientWidth,
                bottom: window.innerHeight - node.offsetTop - node.clientHeight }
            if (!objectEquals(newBorder, border)) setBorder(newBorder)
        }
    })

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