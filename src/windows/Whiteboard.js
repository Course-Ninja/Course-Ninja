import { createContext, useContext, useState, useEffect, useRef } from "react"
import { useDrop } from "react-dnd"
import { useContextMenu } from "react-contexify"
import { v4 as uuid } from "uuid"
import Draggable from "../drags/Draggable"
import Dragtype from "../drags/Dragtype"
import { SharedContext, ScreensContext } from "../App"
import { useEditScreen } from "../components/utils"

export const WhiteboardContext = createContext()
export const VariableContext = createContext()

const Whiteboard = ({ children }) => {
    const { objRef } = useContext(ScreensContext)
    const { testing } = useContext(SharedContext)
    const [testingScreen, setTestingScreen] = useState()
    const [testingVariables, setTestingVariables] = useState()
    const [variables, setVariables] = useState({})
    const editScreen = useEditScreen()

    const className = `rounded-md border-4 border-slate-500 mr-8 flex flex-grow items-center justify-center relative bg-white`
    const ref = useRef()
    const [boundingBox, setBoundingBox] = useState({})

    const [, drop] = useDrop({
        drop: ({ id }, monitor) => {
            if (monitor.getItemType() === Dragtype.MenuTile) {
                const delta = monitor.getClientOffset()
                const left = delta.x
                const top = delta.y
                editScreen(uuid(), () => ({ id, left, top, canDrag: false, initial: true, name: "" }))
            }
        },
        hover: (item, monitor) => {
            if (monitor.getItemType() !== Dragtype.MenuTile) {
                const delta = monitor.getDifferenceFromInitialOffset()
                var objleft = delta.x + item.left
                var objtop = delta.y + item.top
                const right = objleft + item.width
                const bottom = objtop + item.height

                if (objleft < boundingBox.left) objleft = boundingBox.left
                if (right > boundingBox.right) objleft = boundingBox.right - item.width
                if (objtop < boundingBox.top) objtop = boundingBox.top
                if (bottom > boundingBox.bottom) objtop = boundingBox.bottom - item.height

                if (testing) setTestingScreen(screen =>
                    ({ ...screen, [item.dragid]: { ...item, left: objleft, top: objtop, initial: false } })
                )

                else editScreen(item.dragid, obj => ({ ...obj, left: objleft, top: objtop, initial: false }))
            }
        },
        accept: testing ? [Dragtype.Testing] : [Dragtype.MenuTile, Dragtype.Moveable]
    }, [boundingBox, testing])

    const { show } = useContextMenu()

    useEffect(() => {
        setTestingScreen(children)
        setTestingVariables(variables)
    }, [testing, children, variables])

    useEffect(() => {
        if (!testing) Object.entries(variables).map(([, { targets, value }]) =>
            targets.forEach(target => editScreen(target, obj => { obj.name = value; return obj }))
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testing, variables])

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
        <div ref={e => { ref.current = drop(e) }} className={className}>
            <WhiteboardContext.Provider value={{ testingScreen, setTestingScreen }}>
                <VariableContext.Provider value={{ variables: testing ? testingVariables : variables, setVariables: testing ? setTestingVariables : setVariables, setTestingVariables }}>
                    {Object.entries(children).length ? Object.entries(testing ? testingScreen : children).map(
                        ([dragid, obj], key) =>
                            <div onContextMenu={event => show({ event, id: dragid })} key={key}>
                                <Draggable dragid={dragid} // for element movement
                                    {...obj}
                                    className="fixed max-h-[100px] max-w-[100px]" // absolute positioning on whiteboard
                                    type={obj["canDrag"] && testing ? Dragtype.Testing : Dragtype.Moveable} //drag type
                                >
                                    {objRef[obj.id]}
                                </Draggable>
                            </div>
                    ) : <p className="select-none">Whiteboard</p>}
                </VariableContext.Provider>
            </WhiteboardContext.Provider>
        </div>
    )
}

export default Whiteboard
