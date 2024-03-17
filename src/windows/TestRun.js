import { useContext } from "react"
import { ScreensContext } from "../App"

const TestRun = () => {
    const { setTesting } = useContext(ScreensContext)
    const start = () => {
        setTesting(true)
    }
    const stop = () => {
        setTesting(false)
    }
    return <div className="ml-2 flex h-[6%] w-1/2">
        <img className="p-1 cursor-pointer" src="play-512.png" alt="start" onClick={start} />
        <img className="p-1 cursor-pointer" src="hexagon-512.png" alt="stop" onClick={stop} />
    </div>
}

export default TestRun