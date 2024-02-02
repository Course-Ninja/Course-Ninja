import { useDrop } from "react-dnd"
import Dragtype from "../drags/Dragtype"
import { ElementsContext } from "../App"
import { Children, createContext, useCallback, useContext, useState } from "react"
import Tab from "../components/Tab"

const defaultTab = "Shapes"
export const TabContext = createContext(defaultTab)
export const gridLayout = "grid grid-cols-2 auto-rows-min"

const EditorPane = ({ children }) => {
    const { setElements } = useContext(ElementsContext)
    const [activeTab, setActiveTab] = useState(defaultTab)
    const borderColour = "rgb(100 116 139)"
    const borderSize = 3

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

    return <div ref={drop} className={`overflow-y-auto relative flex flex-col justify-between`}>
        <div className={`flex absolute w-full h-full justify-center items-center ${isOver ? "bg-red-400 opacity-90" : "hidden"}`}>
            <p className="text-2xl font-bold">Delete</p>
        </div>
        <div>
            {Children.map(children, child =>
                <div className={activeTab === child.props.id ? "" : "hidden"}>
                    {child}
                </div>
            )}
        </div>
        <div className="flex overflow-x-auto fixed bottom-0 bg-white w-1/4">
            <TabContext.Provider value={{ activeTab, setActiveTab }}>
                <div className="flex">
                    {Children.map(children, (child, key) =>
                        <Tab id={child.props.id} key={key}
                            style={{
                                borderColor: borderColour,
                                borderWidth: `${borderSize}px`,
                                borderTopColor: activeTab === child.props.id ? "transparent" : borderColour
                            }}
                        >
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