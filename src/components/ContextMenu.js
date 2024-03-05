import { Menu, Item, Separator, Submenu } from "react-contexify"
import 'react-contexify/ReactContexify.css'
import { useDelete } from "./utils"
import { useContext } from "react"
import { ScreensContext } from "../App"

const ContextMenu = ({ id }) => {
    const { activeScreen } = useContext(ScreensContext)
    const remove = useDelete()

    return <>
        <Menu id={id}>
            <Item disabled>{id}</Item>
            <Submenu label="Rotate">
                <Item>Rotate clockwise 90 degrees</Item>
                <Item>Rotate anti-clockwise 90 degrees</Item>
                <Item>Flip horizontally</Item>
                <Item>Flip vertically</Item>
            </Submenu>
            <Separator />
            <Item>Rename</Item>
            <Item onClick={() => remove(activeScreen, id)}>Delete</Item>
        </Menu>
    </>
}

export default ContextMenu