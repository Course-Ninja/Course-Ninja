import { useContext, Children, useEffect } from "react"
import Draggable from "../drags/Draggable"
import { ElementsContext } from "../App"

const MenuTile = (props) => {
    const className = "aspect-square border-4 border-slate-500 flex justify-center items-center"
    const { setObjRefs } = useContext(ElementsContext)
    const { id, children } = props
    if (!id) throw new Error("All MenuTiles need id attributes (eg <MenuTile id=\"foo\">)")

    const child = Children.toArray(children)[0]

    useEffect(() =>
        setObjRefs(objs => ({ ...objs, [id]: child }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [])

    return <div className={className}{...props}>
        <Draggable id={id} className="size-full flex justify-center items-center">
            {children}
        </Draggable>
    </div>
}

export default MenuTile