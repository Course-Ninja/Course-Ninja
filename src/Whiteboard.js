import { useDrop } from "react-dnd"

const Whiteboard = (props) => {
    const [collectProps, drop] = useDrop(() => ({
        accept: props.accepttype
    }))
    return <div ref={drop} class={props.class}>{props.children}</div>
}

export default Whiteboard