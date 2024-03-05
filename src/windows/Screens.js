import { useContext } from "react"
import { ElementsContext, ScreensContext } from "../App"
import Preview from "../components/Preview"

const Screens = () => {
    const { setScreens, screens, setActiveScreen } = useContext(ScreensContext)

    const click = () => {
        setScreens(elements => ([...elements, {}]))
    }

    return <div className="bg-[#BBBBBB] size-full overflow-y-auto">
        {screens.map((element, index) => <div className="flex items-center justify-center" key={index}>
            <span className="p-2 pl-4">Screen {index + 1}</span>
            <Preview
                onClick={e => setActiveScreen(index)}
                className="aspect-video w-2/5 rounded-md border-4 border-slate-500 m-2 flex flex-grow items-center justify-center relative bg-white">
                {/* {Object.entries(element).map(([, elem]) => elem)} */}
            </Preview>
        </div>)}
        <div className="flex items-center justify-center">
            <span className="p-2 pl-4 invisible">Screen 9</span>
            <Preview
                onClick={click}
                className="aspect-video w-2/5 rounded-md border-4 border-slate-500 m-2 flex flex-grow items-center justify-center relative bg-[#F0F5F9]">
                <span className="font-bold text-2xl">+</span>
            </Preview>
        </div>
    </div>
}

export default Screens