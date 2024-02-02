import { useCallback, useContext } from "react"
import { Menu, Item, Separator, Submenu } from "react-contexify"
import 'react-contexify/ReactContexify.css'
import { ElementsContext } from "../App"

const ContextMenu = ({id}) => {
    const { setElements } = useContext(ElementsContext)
    const remove = useCallback(id => 
        setElements(elems => Object.fromEntries(
            Object.entries(elems).filter(([key,]) => key !== id)
        ))
    , [setElements])

    return <>
        <Menu id={id}>
            <Item disabled>{id}</Item>
            <Submenu label="Rotate">
                <Item>Rotate clockwise 90 degrees</Item>
                <Item>Rotate anti-clockwise 90 degrees</Item>
                <Item>Flip horizontally</Item>
                <Item>Flip vertically</Item>
            </Submenu>
            <Separator/>
            <Item>Rename</Item>
            <Item onClick={() => remove(id)}>Delete</Item>
        </Menu>
    </>
}
export const MENU_ID = "menu"

export default ContextMenu