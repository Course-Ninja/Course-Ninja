const EditorPane= (props) => {
    const className="grid grid-cols-2 auto-rows-min"
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default EditorPane 