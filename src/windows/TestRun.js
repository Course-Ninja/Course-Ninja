import { useContext } from "react"
import { ScreensContext } from "../App"

const TestRun = () => {
    const { testing, setTesting } = useContext(ScreensContext)
    const start = () => {
        setTesting(true)
    }
    const stop = () => {
        setTesting(false)
    }
    return <div className="ml-2 flex h-8 w-1/2">
        <img style={{ opacity: testing ? 0.4 : 1 }} className="p-1 cursor-pointer h-8" src="play-512.png" alt="start" onClick={start} />
        <img style={{ opacity: testing ? 1 : 0.4 }} className="p-1 cursor-pointer h-8" src="hexagon-512.png" alt="stop" onClick={stop} />
    </div>
}

export default TestRun
