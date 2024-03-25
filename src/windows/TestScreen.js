import { useContext } from "react"
import { ScreensContext } from "../App"

const TestScreen = ({ children }) => {
    const {objRef} = useContext(ScreensContext)
    const className = "rounded-md border-4 border-slate-500 mr-8 flex flex-grow items-center justify-center relative bg-white"

    return <div className={className}>
        {Object.entries(children).map(
            ([dragid, obj], key) =>
                <div dragid={dragid} // for element movement
                    key={key}
                    style={{left: obj.left, top: obj.top}}
                    className="fixed max-h-[100px] max-w-[100px]" // absolute positioning on whiteboard
                >
                    {objRef[obj.id]}
                </div>
        )}
    </div>
}

export default TestScreen