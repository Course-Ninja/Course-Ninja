import { createContext, useContext, useRef, useEffect, useState } from "react"
import { useDrop } from "react-dnd"
import { ScreensContext } from "../App"
import Dragtype from "../drags/Dragtype"
import Draggable from "../drags/Draggable"

export const TestingContext = createContext()

const TestScreen = ({ children }) => {
    const { objRef } = useContext(ScreensContext)
    const classname = "rounded-md border-4 border-slate-500 mr-8 flex flex-grow items-center justify-center relative bg-white"
    const [boundingBox, setBoundingBox] = useState({})
    const [screen, setScreen] = useState({ ...children })
    const ref = useRef()

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

    const [, drop] = useDrop({
        hover: ({ dragid, id, width, height, left, top, canDrag }, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset()
            var objleft = delta.x + left
            var objtop = delta.y + top
            const right = objleft + width
            const bottom = objtop + height

            if (objleft < boundingBox.left) objleft = boundingBox.left
            if (right > boundingBox.right) objleft = boundingBox.right - width
            if (objtop < boundingBox.top) objtop = boundingBox.top
            if (bottom > boundingBox.bottom) objtop = boundingBox.bottom - height
            console.log(objleft, right, objtop, bottom)
            setScreen(screen => ({ ...screen, [dragid]: { id, left: objleft, top: objtop, initial: false, canDrag } }))
        },
        accept: [Dragtype.Testing]
    })

    return <div ref={e => { drop(e); ref.current = e }} className={classname}>
        {Object.entries(screen).map(
            ([dragid, { id, left, top }], key) => <Draggable dragid={dragid} id={id} type={Dragtype.Testing} className="fixed max-h-[100px] max-w-[100px]" left={left} top={top} key={key}>
                    {objRef[id]}
            </Draggable>
        )}
    </div>
}

export default TestScreen