import { useDrag } from "react-dnd"

const Draggable = (props) => {
    const classes="aspect-square border-8 border-sky-500" 
    const [collected, drag, dragpreview] = useDrag(() => (
        {
            type: props.type,
            item: { id: props.id, obj: props.children },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }
    ))
    return collected.isDragging ? (
        <div className={classes} ref={dragpreview}>
            <svg viewBox="0 0 100 100">
                {props.children}
            </svg>
        </div>
    ) : (
        <div className={classes} ref={drag}>
            <svg viewBox="0 0 100 100">
                {props.children}
            </svg>
        </div>
    )
}

export default Draggable