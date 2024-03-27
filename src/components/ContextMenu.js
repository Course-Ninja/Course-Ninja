import { Menu, Item, Separator } from "react-contexify"
import Modal from 'react-modal'
import 'react-contexify/ReactContexify.css'
import { useDelete } from "./utils"
import { useContext, useState } from "react"
import { SharedContext } from "../App"
import Button from "./Button"

const ContextMenu = ({ id }) => {
    const { activeScreen, setScreens } = useContext(SharedContext)
    const [modalOpen, openModal] = useState(false)
    const [name, setName] = useState("")
    const remove = useDelete()

    const collectName = ({ target: { value } }) => {
        setName(value)
    }

    const rename = () => {
        openModal(false)
        setScreens(screens => screens.map(
            (screen, key) => key === activeScreen ? {...screen, [id]: {...screen[id], name}} : screen
        ))
    }

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
            <input autoFocus onKeyDown={(e) => { if (e?.key === "Enter") rename() }} onInput={collectName} className="border-2 border-black"></input>
            <Button onClick={rename}>Rename</Button>
            <Button onClick={() => openModal(false)}>Cancel</Button>
        </Modal >
        <Menu id={id}>
            <Item disabled>{id}</Item>
            <Separator />
            <Item onClick={() => openModal(true)}>Rename</Item>
            <Item onClick={() => remove(activeScreen, id)}>Delete</Item>
        </Menu>
    </>
}

export default ContextMenu