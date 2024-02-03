import { useDrop } from "react-dnd"
import Dragtype from "../drags/Dragtype"
import { ElementsContext } from "../App"
import { Children, createContext, useCallback, useContext, useState } from "react"
import TabsPane from "./TabsPane"

const defaultTab = "Shapes"
export const TabContext = createContext(defaultTab)
export const gridLayout = "grid grid-cols-2 auto-rows-min"

const EditorPane = ({ children, width }) => {
    const { setElements } = useContext(ElementsContext)
    const [activeTab, setActiveTab] = useState(defaultTab)

    const removeElement = useCallback(id => {
        setElements(elems => Object.fromEntries(
            Object.entries(elems).filter(([key,]) => key !== id)
        ))
    }, [setElements])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: [Dragtype.Moveable],
        drop: ({ id }) => {
            removeElement(id)
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
        <div>
            {Children.map(children, child =>
                <div className={activeTab === child.props.id ? "" : "hidden"}>
                    {child}
                </div>
            )}
        </div>
    </div>
}

export default EditorPane 