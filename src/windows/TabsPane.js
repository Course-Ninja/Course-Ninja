import { Children } from "react"
import Tab from "../components/Tab"

const TabsPane = ({ children }) => {
    const borderColor = "rgb(100 116 139)"
    const borderWidth = 3

    return (
        <div className="bg-[#4F6D7A] text-white flex flex-col flex-none overflow-y-auto hidescroll">
            {Children.map(children, ({ props: { name, children } }, key) =>
            <Tab name={name} key={key}
                >
                    {children}
                </Tab>
            )}
            <div className="h-full"
                style={{ borderColor, borderRightWidth: borderWidth }}
            ></div>
        </div>
    )
}

export default TabsPane