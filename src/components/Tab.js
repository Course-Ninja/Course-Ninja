import { useContext } from "react"
import { TabContext } from "../windows/EditorPane"

const Tab = ({ name, children, style }) => {
    const { setActiveTab } = useContext(TabContext)

    return <div onClick={() => {setActiveTab(name)}}
        className="aspect-square rounded-l-lg cursor-pointer flex flex-col flex-none justify-center items-center hover:bg-indigo-700 hover:text-white"
        style={style}>
        {children}
        <p className="whitespace-nowrap select-none px-1">{name}</p>
    </div>
}

export default Tab