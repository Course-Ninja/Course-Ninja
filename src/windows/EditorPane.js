import { useDrop } from "react-dnd"
import Dragtype from "../drags/Dragtype"

const EditorPane = (props) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: [Dragtype.Moveable],
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