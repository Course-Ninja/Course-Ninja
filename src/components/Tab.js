import { useCallback, useContext } from "react"
import { TabContext } from "../windows/EditorPane"

const Tab = ({ name, children, style }) => {
    const { setActiveTab } = useContext(TabContext)

    const switchTab = useCallback(() => {
        setActiveTab(name)
    }, [setActiveTab, name])

    return <div onClick={switchTab}
        className="aspect-square rounded-l-lg cursor-pointer flex flex-col flex-none justify-center items-center"
        style={style}>
        {children}
        <p className="whitespace-nowrap select-none px-1">{name}</p>
    </div>
}

export default Tab