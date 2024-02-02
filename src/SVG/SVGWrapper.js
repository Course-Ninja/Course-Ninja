const SVGWrapper = ({children}) => {
    return <svg viewBox="0 0 100 100" className="size-full">
        {children}
    </svg>
}

export default SVGWrapper