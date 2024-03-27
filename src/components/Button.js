const Button = ({ children, onClick, disabled }) => {
    return <div
        className="border-2 border-black px-2 rounded-full bg-[#e0e0e0] w-min m-2 ml-0 cursor-pointer"
        onClick={disabled ? () => {} : onClick}
    >
        {children}
    </div>
}

export default Button