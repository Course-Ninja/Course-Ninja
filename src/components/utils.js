import { useContext } from "react"
import { SharedContext } from "../App"
import { VariableContext } from "../windows/Whiteboard"

export const useDelete = () => {
    const { setScreens } = useContext(SharedContext)
    const setVariables = useContext(VariableContext)?.setVariables

    return (index, id) => setScreens(screens => screens.map((screen, idx) => {
        const variable = screen[id].variable
        if (variable && setVariables) setVariables(variables => {
            const { targets } = variables[variable]
            if (targets.length === 1) delete variables[variable]
            else targets.splice(targets.indexOf(id), 1)
            return variables
        })

        if (idx === index) {
            delete screen[id]
        }
        return screen
    }))
}

export const useRename = () => {
    const { setScreens } = useContext(SharedContext)

    return (index, id, name) => setScreens(screens => screens.map((screen, idx) => {
        if (idx === index) {
            screen[id]["name"] = name
        }
        return screen
    }))
}

export function useEditScreen() {
    const { setScreens, activeScreen } = useContext(SharedContext)

    return (dragid, func) => setScreens(screens => screens.map((screen, idx) =>
        idx === activeScreen ? { ...screen, [dragid]: func(screen[dragid]) } : screen
    ))
}

export function useUpdateNames() {
    const editScreen = useEditScreen()

    return (variables) => {
        Object.entries(variables).map(([, { targets, value }]) =>
            targets.forEach(target => editScreen(target, obj => { obj.name = value; return obj }))
        )
    }
}