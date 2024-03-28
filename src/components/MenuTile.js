import { useContext, useEffect, useState } from "react"
import Draggable from "../drags/Draggable"
import { EditorContext } from "../App"
import { v4 as uuid } from "uuid"

const MenuTile = ({children}) => {
    const className = "aspect-square min-w-[16%] max-w-[16%] border-4 border-slate-500 flex justify-center items-center bg-white"
    const { setObjRefs } = useContext(EditorContext)
    const [ id ] = useState(uuid())

    useEffect(() =>
        setObjRefs(objs => ({ ...objs, [id]: children }))
        // DO NOT DELETE THIS AND NEXT COMMENT
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [])

    return <div className={className}>
        <Draggable id={id} className="flex size-full justify-center items-center">
            {children}
        </Draggable>
    </div>
}

export default MenuTile