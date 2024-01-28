import { useDrag } from "react-dnd"

export default Draggable = (props) => {
    const [collected, drag, dragpreview] = useDrag(() => (
        {
            type: props.type,
            item: props.id,
            // collect: (monitor) => ({
            //     isDragging: monitor.isDragging()
            // })
        }
    ))
    return collected.isDragging ? (
        <div class={props.class} ref={dragpreview}>
            {props.children}
        </div>
    ) : (
        <div class={props.class} ref={drag} {...collected}>
            {props.children}
        </div>
    )
}