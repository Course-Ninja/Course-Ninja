import { Children, useContext, useEffect } from "react"
import { useDrop } from "react-dnd"
import Dragtype from "../drags/Dragtype"
import { ElementsContext } from "../App"
import { useDelete } from "../components/utils"

const EditorPane = ({ children }) => {
    const { activeTab, setTabs } = useContext(ElementsContext)

    const removeElement = useDelete()
    const [{ isOver }, drop] = useDrop(() => ({
        accept: [Dragtype.Moveable],
        drop: ({ dragid }) => {
            removeElement(dragid)
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    }))

    useEffect(() => {
        Children.map(children, child =>
            setTabs(elements => ({ ...elements, [child.props.name]: child }))
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div ref={drop} className="flex z-30">
        <div className={`fixed p-32 size-full bg-red-400 opacity-90 z-40  ${isOver ? "" : "hidden"}`}>
            <p className="select-none text-2xl font-bold">Delete</p>
        </div>
        <div className="w-full">
            {Children.map(children, child =>
                <div className={activeTab === child.props.name ? "" : "hidden"}>
                    {child}
                </div>
            )}
        </div>
    </div>
}

export default EditorPane 