import { useContext, useCallback } from "react"
import { ElementsContext } from "../App"

export const useDelete = () => {
    const { setScreens } = useContext(ElementsContext)

    return useCallback((index, id) => {
        setScreens(screens => screens.map((screen, idx) =>
            idx === index ? Object.fromEntries(
                Object.entries(screen).filter(([key,]) => key !== id)
            ) : screen)
        )
    }, [setScreens])
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
