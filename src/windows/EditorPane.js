import { useDrop } from "react-dnd"
import Dragtype from "../drags/Dragtype"
import { ElementsContext } from "../App"
import { Children, createContext, useCallback, useContext, useState } from "react"
import Tab from "../components/Tab"

const defaultTab = "Objects"
const borderColour = "slate-500"
const borderSize = 4
export const TabContext = createContext(defaultTab)

const EditorPane = ({ children }) => {
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

    return <div ref={drop} className={`flex flex-col justify-between relative ${isOver ? "bg-red-400" : ""}`}>
        <div className={`flex absolute w-full h-full justify-center items-center ${isOver ? "" : "hidden"}`}>
            <p className="text-2xl font-bold">Delete</p>
        </div>
        <div>
            {/* {props.children} */}
            {Children.map(children, child =>
                <div className={activeTab === child.type.name ? "" : "hidden"}>
                    {child}
                </div>
            )}
        </div>
        <div className="flex">
            <TabContext.Provider value={{ activeTab, setActiveTab }}>
                <div className={`flex`}>
                    {Children.map(children, child =>
                        <Tab id={child.type.name}
                            className={`rounded-b-lg border-${borderSize} border-${borderColour} ${activeTab === child.type.name ? "border-t-transparent" : ""}`}>
                            {child.type.name}
                        </Tab>
                    )}
                </div>
                <div className={`border-t-${borderSize} border-${borderColour} w-full`}></div>
            </TabContext.Provider>
        </div>
    </div>
}

export default EditorPane 