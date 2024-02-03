import { useContext, Children } from "react"
import Tab from "../components/Tab"
import { TabContext } from "./EditorPane"

const TabsPane = ({ children }) => {
    const borderColour = "rgb(100 116 139)"
    const borderSize = 3
    const { activeTab } = useContext(TabContext)

    return (
        <div className="flex flex-col flex-none overflow-y-auto hidescroll">
            {Children.map(children, (child, key) =>
                <Tab id={child.props.id} key={key}
                    style={{
                        borderColor: borderColour,
                        borderWidth: `${borderSize}px`,
                        borderRightColor: activeTab === child.props.id ? "transparent" : borderColour
                    }}
                >
                    {child.props.id}
                </Tab>
            )}
            <div className="h-full"
                style={{ borderColor: borderColour, borderRightWidth: `${borderSize}px` }}
            ></div>
        </div>
    )
}

export default TabsPane