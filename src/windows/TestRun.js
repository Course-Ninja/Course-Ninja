import { useContext } from "react"
import { ScreensContext, SharedContext } from "../App"

const TestRun = () => {
    const { setTesting } = useContext(ScreensContext)
    const { testing } = useContext(SharedContext)

    const start = () => {
        setTesting(true)
    }

    const stop = () => {
        setTesting(false)
    }
    return <div className="ml-2 flex h-[6%] w-1/2">
        <img
            className="p-1"
            src="play-512.png"
            alt="start"
            style={{
                opacity: testing ? 0.4 : 1,
                cursor: testing ? "default" : "pointer"
            }}
            onClick={start} />
        <img
            className="p-1"
            src="hexagon-512.png"
            alt="stop"
            style={{
                opacity: !testing ? 0.4 : 1,
                cursor: !testing ? "default" : "pointer"
            }}
            onClick={stop} />
    </div>
}

export default TestRun
