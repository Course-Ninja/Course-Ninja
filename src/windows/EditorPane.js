import { useDrop } from "react-dnd"
import Dragtype from "../drags/Dragtype"
import { Elements } from "../App"
import { useCallback, useContext } from "react"

const EditorPane = (props) => {
    const { setElements } = useContext(Elements)

    const removeElement = useCallback(id => {
        setElements(elems => Object.fromEntries(
            Object.entries(elems).filter(([key,]) => key !== id)
        ))
    }, [setElements])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: [Dragtype.Moveable],
        drop: ({id}) => {
            removeElement(id)
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    }))

    return <div ref={drop} className={`relative resize-x ${isOver ? "bg-red-400" : ""}`}>
        <div className={`flex absolute w-full h-full justify-center items-center ${isOver ? "" : "hidden"}`}>
            <p className="text-2xl font-bold">Delete</p>
        </div>
        {props.children}
    </div>
}

export default EditorPane 