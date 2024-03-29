import { useContext, useCallback } from "react"
import { SharedContext } from "../App"

export const useDelete = () => {
    const { setScreens } = useContext(SharedContext)

    return (index, id) => setScreens(screens => screens.map((screen, idx) => {
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

export const objectEquals = (obj1, obj2) => {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) return false

    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) return false
    }

    return true
}
