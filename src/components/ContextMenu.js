import { Menu, Item, Separator } from "react-contexify"
import Modal from 'react-modal'
import 'react-contexify/ReactContexify.css'
import { useDelete } from "./utils"
import { useContext, useState } from "react"
import { SharedContext } from "../App"
import Button from "./Button"

const ContextMenu = ({ id, canDrag }) => {
    const { setScreens, activeScreen } = useContext(SharedContext)
    const [modalOpen, openModal] = useState(false)
    const [name, setName] = useState("")
    const remove = useDelete()

    const collectName = ({ target: { value } }) => {
        setName(value)
    }

    const handleRename = () => {
        openModal(false)
        setScreens(screens => screens.map(
            (screen, key) => key === activeScreen ? { ...screen, [id]: { ...screen[id], name } } : screen
        ))
    }

    const handleCanDrag = () => setScreens(screens => screens.map((screen, idx) => {
        if (idx === activeScreen) {
            const item = screen[id]
            item["canDrag"] = !item["canDrag"]
        }
        return screen
    }))

    return <>
        <Modal
            isOpen={modalOpen}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                }
            }}
        >
            <p>Set the name of the object</p>
            <input autoFocus onKeyDown={(e) => { if (e?.key === "Enter") handleRename() }} onInput={collectName} className="border-2 border-black" />
            <Button onClick={handleRename}>Rename</Button>
            <Button onClick={() => openModal(false)}>Cancel</Button>
        </Modal >
        <Menu id={id}>
            <Item disabled>{id}</Item>
            <Separator />
            <Item onClick={() => openModal(true)}>Rename</Item>
            <Item onClick={() => remove(activeScreen, id)}>Delete</Item>
            <Item onClick={() => handleCanDrag()}>Moveable {canDrag && String.fromCharCode(10003)}</Item>
        </Menu>
    </>
}

export default ContextMenu
