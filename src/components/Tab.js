import { useCallback, useContext } from "react"
import { TabContext } from "../windows/EditorPane"

const Tab = ({ id, children, className, style }) => {
    const { setActiveTab } = useContext(TabContext)

    const switchTab = useCallback(() => {
        setActiveTab(id)
    }, [setActiveTab, id])

    return <p onClick={switchTab}
        className="rounded-b-lg px-1 select-none whitespace-nowrap cursor-pointer"
        style={style}>{children}</p>
}

export default Tab