const Preview = ({ onClick, className, children }) => {
    return <div className={className} onClick={onClick}>
        {children}
    </div>
}

export default Preview