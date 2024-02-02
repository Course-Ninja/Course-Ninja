import { useCallback, useContext } from "react"
import { TabContext } from "../windows/EditorPane"

const Tab = ({ id, children, className }) => {
    const { setActiveTab } = useContext(TabContext)

    const switchTab = useCallback(() => {
        setActiveTab(id)
    }, [setActiveTab, id])

    return <p onClick={switchTab} className={className}>{children}</p>
}

export default Tab