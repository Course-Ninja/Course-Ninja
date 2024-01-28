import { useDrag } from "react-dnd"

const Draggable = (props) => {
    const classes="aspect-square border-8 border-sky-500" 
    const [collected, drag, dragpreview] = useDrag(() => (
        {
            type: props.type,
            item: props.id,
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }
    ))
    return collected.isDragging ? (
        <div class={classes} ref={dragpreview}>
            <svg viewBox="0 0 100 100">
                {props.children}
            </svg>
        </div>
    ) : (
        <div class={classes} ref={drag} {...collected}>
            <svg viewBox="0 0 100 100">
                {props.children}
            </svg>
        </div>
    )
}

export default Draggable