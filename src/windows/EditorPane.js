import { useDrop } from "react-dnd"
import Dragtype from "../drags/Dragtype"
import { ElementsContext } from "../App"
import { Children, createContext, useCallback, useContext, useState } from "react"
import Tab from "../components/Tab"

const defaultTab = "Objects"
export const TabContext = createContext(defaultTab)

const EditorPane = ({ children }) => {
    const { setElements } = useContext(ElementsContext)
    const [activeTab, setActiveTab] = useState(defaultTab)
    const borderColour = "rgb(100 116 139)"
    const borderSize = 4

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
            {Children.map(children, child =>
                <div className={activeTab === child.props.id ? "" : "hidden"}>
                    {child}
                </div>
            )}
        </div>
        <div className="flex">
            <TabContext.Provider value={{ activeTab, setActiveTab }}>
                <div className="flex">
                    {Children.map(children, (child, key) =>
                        <Tab id={child.props.id} key={key}
                            style={{
                                borderColor: borderColour,
                                borderWidth: `${borderSize}px`,
                                borderTopColor: activeTab === child.props.id ? "transparent" : borderColour
                            }}
                            className="rounded-b-lg">
                            {child.props.id}
                        </Tab>
                    )}
                </div>
                <div className="w-full"
                    style={{ borderColor: borderColour, borderTopWidth: `${borderSize}px` }}
                ></div>
            </TabContext.Provider>
        </div>
    </div>
}

export default EditorPane 