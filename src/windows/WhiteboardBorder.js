import { useContext } from "react"
import { ElementsContext } from "../App"

const WhiteboardBorder = () => {
    const { border, visible } = useContext(ElementsContext)

    if (border) {
        const { right, left, top, bottom } = border
        return <>
            <div className={`${visible ? "opacity-0" : "hidden"} z-20 fixed bg-rose-50 w-full top-0 left-0`} style={{ height: top }}></div>
            <div className={`${visible ? "opacity-0" : "hidden"} z-20 fixed bg-rose-50 h-full top-0 left-0`} style={{ width: left }}></div>
            <div className={`${visible ? "opacity-0" : "hidden"} z-20 fixed bg-rose-50 w-full left-0 bottom-0`} style={{ height: bottom }}></div>
            <div className={`${visible ? "opacity-0" : "hidden"} z-20 fixed bg-rose-50 h-full top-0 right-0`} style={{ width: right }}></div>
        </>
    }
}

export default WhiteboardBorder