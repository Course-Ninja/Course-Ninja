import { useDrop } from "react-dnd"

export default Whiteboard = (props) => {
    const [collectProps, drop] = useDrop(() => ({
        accept: props.accepttype
    }))
    return <div ref={drop}>Drop target</div>
}