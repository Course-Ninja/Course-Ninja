import { Children, createContext, useState } from "react"
import { useDrop } from "react-dnd"
import Dragtype from "../drags/Dragtype"
import TabsPane from "./TabsPane"
import { useDelete } from "../components/utils"

const defaultTab = "Shapes"
export const TabContext = createContext(defaultTab)

const EditorPane = ({ children, width }) => {
    const [activeTab, setActiveTab] = useState(defaultTab)

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

    return <div ref={drop} className="flex" style={{ width }}>
        <div className={`flex fixed size-full ${isOver ? "bg-red-400 opacity-90" : "hidden"}`} style={{ width }}>
            <p className="text-2xl font-bold m-auto">Delete</p>
        </div>
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            <TabsPane>
                {children}
            </TabsPane>
        </TabContext.Provider>
        <div className="w-full overflow-y-auto">
            {Children.map(children, child =>
                <div className={activeTab === child.props.name ? "" : "hidden"}>
                    {child}
                </div>
            )}
        </div>
    </div>
}

export default EditorPane 