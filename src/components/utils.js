import { useContext, useCallback } from "react"
import { ElementsContext } from "../App"

export const useDelete = () => {
    const { setElements } = useContext(ElementsContext)
    return useCallback(id => {
        setElements(elems => Object.fromEntries(
            Object.entries(elems).filter(([key,]) => key !== id)
        ))
    }, [setElements])
}
