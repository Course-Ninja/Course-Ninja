import { useContext, useState, useEffect, useRef } from "react"
import { useDrop } from "react-dnd"
import { useContextMenu } from "react-contexify"
import { v4 as uuid } from "uuid"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import { SharedContext, ScreensContext } from "../App"

const Whiteboard = ({ children }) => {
    const { objRef } = useContext(ScreensContext)
    const { setScreens, activeScreen, testing } = useContext(SharedContext)
    const [testingScreen, setTestingScreen] = useState()

    const className = `rounded-md border-4 border-slate-500 mr-8 flex flex-grow items-center justify-center relative bg-white`
    const ref = useRef()
    const [boundingBox, setBoundingBox] = useState({})

    const [, drop] = useDrop({
        drop: ({ id }, monitor) => {
            if (monitor.getItemType() === Dragtype.MenuTile) {
                const delta = monitor.getClientOffset()
                const left = delta.x
                const top = delta.y
                setScreens(screens =>
                    screens.map((screen, key) =>
                        key === activeScreen ? { ...screen, [uuid()]: { id, left, top, canDrag: true, initial: true } } : screen
                    )
                )
            }
        },
        hover: ({ dragid, id, width, height, left, top, canDrag, name }, monitor) => {
            if (monitor.getItemType() !== Dragtype.MenuTile) {
                const delta = monitor.getDifferenceFromInitialOffset()
                var objleft = delta.x + left
                var objtop = delta.y + top
                const right = objleft + width
                const bottom = objtop + height

                if (objleft < boundingBox.left) objleft = boundingBox.left
                if (right > boundingBox.right) objleft = boundingBox.right - width
                if (objtop < boundingBox.top) objtop = boundingBox.top
                if (bottom > boundingBox.bottom) objtop = boundingBox.bottom - height

                if (testing) setTestingScreen(screen =>
                    ({ ...screen, [dragid]: { id, left: objleft, top: objtop, canDrag, initial: false } })
                )

                else setScreens(screens =>
                    screens.map((screen, key) =>
                        key === activeScreen ? { ...screen, [dragid]: { id, left: objleft, top: objtop, canDrag, initial: false, name } } : screen
                    )
                )
            }
        },
        accept: testing ? [Dragtype.Testing] : [Dragtype.MenuTile, Dragtype.Moveable]
    }, [boundingBox, testing, activeScreen])

    const { show } = useContextMenu()

    useEffect(() => {
        setTestingScreen(children)
    }, [testing, children])

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
    }, [children])

    return (
        <div ref={e => {
            drop(e)
            ref.current = e
        }} className={className}>
            {Object.entries(children).length ? Object.entries(testing ? testingScreen : children).map(
                ([dragid, obj], key) =>
                    <div onContextMenu={event => show({ event, id: dragid })} key={key}>
                        <Draggable dragid={dragid} // for element movement
                            {...obj}
                            className="fixed max-h-[100px] max-w-[100px]" // absolute positioning on whiteboard
                            type={testing ? Dragtype.Testing : Dragtype.Moveable} //drag type
                        >
                            {objRef[obj.id]}
                        </Draggable>
                    </div>
            ) : <p className="select-none">Whiteboard</p>}
        </div>
    )
}

export default Whiteboard