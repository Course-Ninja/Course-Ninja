import { useDrag } from "react-dnd"

const Draggable = (props) => {
    const [collected, drag, dragpreview] = useDrag(() => ({
        type: props.type,
        item: { id: props.dragid, obj: props.children, left: props.left, top: props.top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    const { left, top } = props
    return (
        <div ref={collected.isDragging ? dragpreview : drag} className={props.className} style={{ left, top }}>
            <svg viewBox="0 0 100 100" className="size-full">
                {props.children}
            </svg>
        </div>
    )
}

export default Draggable