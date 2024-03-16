import { useContext, useState, useEffect, useRef } from "react"
import { useDrop } from "react-dnd"
import { useContextMenu } from "react-contexify"
import { v4 as uuid } from "uuid"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import ContextMenu from "../components/ContextMenu"
import { SharedContext, ScreensContext } from "../App"

const Whiteboard = ({ children, num }) => {
    const { objRef } = useContext(ScreensContext)
    const { setScreens, activeScreen } = useContext(SharedContext)

    const className = `${activeScreen === num ? "" : "hidden"} rounded-md border-4 border-slate-500 mr-8 flex flex-grow items-center justify-center relative bg-white`
    const ref = useRef()
    const [boundingBox, setBoundingBox] = useState({})

    const [, drop] = useDrop({
        drop: (item, monitor) => {
            if (monitor.getItemType() === Dragtype.MenuTile) {
                const delta = monitor.getClientOffset()
                const left = delta.x
                const top = delta.y
                const { id } = item
                setScreens(screens =>
                    screens.map((screen, key) =>
                        key === num ? { ...screen, [uuid()]: { id, left, top, initial: true } } : screen
                    )
                )
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
                setScreens(screens =>
                    screens.map((screen, key) =>
                        key === num ? { ...screen, [dragid]: { id, left, top, initial: false } } : screen
                    )
                )
            }
        },
        accept: [Dragtype.MenuTile, Dragtype.Moveable]
    })

    const { show } = useContextMenu()

    useEffect(() => {
        // gets size of whiteboard
        const node = ref.current
        if (node) {
            const rect = node.getBoundingClientRect()
            setBoundingBox({
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom
            })
        }
    }, [num])

    return (
        <div ref={e => {
            drop(e)
            ref.current = e
        }} className={className}>
            {Object.entries(children).length ? Object.entries(children).map(
                ([dragid, obj], key) =>
                    <div onContextMenu={event => show({ event, id: dragid })} key={key}>
                        <Draggable dragid={dragid} // for element movement
                            {...obj}
                            className="fixed max-h-[100px] max-w-[100px]" // absolute positioning on whiteboard
                            type={Dragtype.Moveable} //drag type
                        >
                            {objRef[obj.id]}
                        </Draggable>
                        <ContextMenu id={dragid} />
                    </div>
            ) : <p className="select-none">Whiteboard</p>}
        </div>
    )
}

export default Whiteboard