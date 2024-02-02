import { useCallback, useContext } from "react"
import { TabContext } from "../windows/EditorPane"

const Tab = ({ id, children, className, style }) => {
    const { setActiveTab } = useContext(TabContext)

    const switchTab = useCallback(() => {
        setActiveTab(id)
    }, [setActiveTab, id])

    return <p onClick={switchTab} className={className} style={style}>{children}</p>
}

export default Tab