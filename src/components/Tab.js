import { useCallback, useContext } from "react"
import { TabContext } from "../windows/EditorPane"

const Tab = ({ id, children, style }) => {
    const { setActiveTab } = useContext(TabContext)

    const switchTab = useCallback(() => {
        setActiveTab(id)
    }, [setActiveTab, id])

    return <p onClick={switchTab}
        className="aspect-square rounded-l-lg px-1 select-none whitespace-nowrap cursor-pointer flex flex-none justify-center items-center"
        style={style}>{children}</p>
}

export default Tab