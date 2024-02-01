import { Menu, Item, Separator, Submenu } from "react-contexify"
import 'react-contexify/ReactContexify.css'
const ContextMenu = (props) => {
    return <>
        {props.children}
        <Menu id={MENU_ID}>
            <Submenu label="Rotate">
                <Item>Rotate clockwise 90 degrees</Item>
                <Item>Rotate anti-clockwise 90 degrees</Item>
                <Item>Flip horizontally</Item>
                <Item>Flip vertically</Item>
            </Submenu>
            <Separator></Separator>
            <Item>Rename</Item>
            <Item>Delete</Item>
        </Menu>
    </>
}
export const MENU_ID = "menu"

export default ContextMenu