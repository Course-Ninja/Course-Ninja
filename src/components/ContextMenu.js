import { Menu, Item, Separator, Submenu } from "react-contexify"
import Modal from 'react-modal'
import 'react-contexify/ReactContexify.css'
import { useDelete, useEditScreen, useUpdateNames } from "./utils"
import { useContext, useState } from "react"
import { SharedContext } from "../App"
import Button from "./Button"
import { VariableContext } from "../windows/Whiteboard"

const ContextMenu = ({ id, canDrag, variable: passedVariable }) => {
    const { activeScreen } = useContext(SharedContext)
    const { setVariables, variables } = useContext(VariableContext)
    const [renameObjectModal, setRenameModal] = useState(false)
    const [createVariableModal, setVariableModal] = useState(false)
    const [name, setName] = useState("")
    const [variable, setVariable] = useState("")
    const remove = useDelete()
    const editScreen = useEditScreen()
    const updateNames = useUpdateNames()

    const collectName = ({ target: { value } }) => {
        setName(value)
    }

    function collectVariable({ target: { value } }) {
        setVariable(value)
    }

    const handleRename = () => {
        setRenameModal(false)

        editScreen(id, (obj) => { obj.name = name; return obj })

        if (passedVariable) {
            setVariables(variables => {
                variables[passedVariable].value = name
                return variables
            })
            updateNames(variables)
        }
    }

    const handleCanDrag = () => editScreen(id, (obj) => {
        obj.canDrag = !obj.canDrag
        return obj
    })

    function handleCreateVariable() {
        setVariableModal(false)
        setVariables(variables => ({ ...variables, [variable]: { targets: [id], value: name } }))
        editScreen(id, obj => ({ ...obj, variable }))
    }

    function handleVariable(data) {
        editScreen(id, obj => {
            obj.name = variables[data].value;
            obj.variable = data;
            return obj
        })

        setVariables(variables => {
            variables[data].targets.push(id)
            if (passedVariable) variables[passedVariable].targets.splice(variables[passedVariable].targets.indexOf(id), 1)
            return variables
        })
    }

    const modalStyle = { content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', } }

    return <>
        <Modal
            isOpen={renameObjectModal}
            style={modalStyle}
        >
            <p>Set the name of the object</p>
            <input autoFocus onKeyDown={(e) => { if (e?.key === "Enter") handleRename() }} onInput={collectName} className="border-2 border-black" />
            <Button onClick={handleRename}>Rename</Button>
            <Button onClick={() => setRenameModal(false)}>Cancel</Button>
        </Modal >
        <Modal
            isOpen={createVariableModal}
            style={modalStyle}
        >
            <p>Set the name of the variable</p>
            <input autoFocus onKeyDown={(e) => { if (e?.key === "Enter") handleCreateVariable() }} onInput={collectVariable} className="border-2 border-black" />
            <Button onClick={handleCreateVariable}>Create</Button>
            <Button onClick={() => setVariableModal(false)}>Cancel</Button>
        </Modal>
        <Menu id={id}>
            <Item disabled>{id}</Item>
            <Separator />
            <Item onClick={() => setRenameModal(true)}>Rename</Item>
            <Item onClick={() => remove(activeScreen, id)}>Delete</Item>
            <Item onClick={() => handleCanDrag()}>Moveable {canDrag && String.fromCharCode(10003)}</Item>
            <Submenu label="Variable Menu">
                {Object.entries(variables).map(([varname,], key) => (
                    <Item data={varname} onClick={({ data }) => handleVariable(data)} key={key}>{varname}</Item>
                ))}
                <Item onClick={() => setVariableModal(true)}>Create variable</Item>
            </Submenu>
        </Menu>
    </>
}

export default ContextMenu
