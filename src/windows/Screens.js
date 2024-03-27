import { useContext } from "react"
import { SharedContext, ScreensContext } from "../App"

const Screens = () => {
    const { screens, setActiveScreen } = useContext(ScreensContext)
    // const { objRef, setScreens } = useContext(ElementsContext)
    const { setScreens, activeScreen } = useContext(SharedContext)

    const click = () => {
        setScreens(elements => ([...elements, {}]))
        setActiveScreen(screens.length)
    }

    const removeScreen = idx => {
        if (screens.length !== 1) {
            if (activeScreen) setActiveScreen(num => num - 1)
            setScreens(screens => screens.filter((sc, key) => key !== idx))
        } else setScreens([{}])
    }

    return <div className="bg-[#BBBBBB] size-full overflow-y-auto">
        {screens.map((element, index) => <div className={`flex items-center justify-center ${activeScreen === index ? "bg-violet-400" : ""}`}
            onClick={() => setActiveScreen(index)}
            key={index}
        >
            <span className="p-2 pl-4 select-none">Screen {index + 1}</span>
            <div className="aspect-video w-2/5 rounded-md border-4 border-slate-500 m-2 flex flex-grow items-center justify-center relative bg-white" />
        </div>)}
        <div className="flex items-center justify-center">
            <span className="p-2 pl-4 invisible">Screen 9</span>
            <div
                onClick={click}
                className="cursor-pointer aspect-video w-2/5 rounded-md border-4 border-slate-500 m-2 flex flex-grow items-center justify-center relative bg-[#F0F5F9]">
                <span className="font-bold text-2xl">+</span>
            </div>
        </div>
    </div>
}

export default Screens