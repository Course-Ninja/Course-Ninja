import { useContext, Children } from "react"
import Tab from "../components/Tab"
import { TabContext } from "./EditorPane"

const TabsPane = ({ children }) => {
    const borderColor = "rgb(100 116 139)"
    const borderWidth = 3
    const { activeTab } = useContext(TabContext)

    return (
        <div className="flex flex-col flex-none overflow-y-auto hidescroll">
            {Children.map(children, ({props: {name, children}}, key) =>
                <Tab name={name} key={key}
                    style={{
                        borderColor,
                        borderWidth,
                        borderRightColor: activeTab === name ? "transparent" : borderColor
                    }}
                >
                    {children}
                </Tab>
            )}
            <div className="h-full"
                style={{ borderColor, borderRightWidth: borderWidth}}
            ></div>
        </div>
    )
}

export default TabsPane