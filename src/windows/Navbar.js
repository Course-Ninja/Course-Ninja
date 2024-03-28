const Navbar = () => {
    return <div className="flex items-center w-full h-auto bg-orange-600 p-2 gap-4 justify-between">
        <div className="flex gap-4">
            <span>Home</span>
            <span>File</span>
        </div>
        <a target="_blank" rel="noreferrer" href="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fe46bkpPW8pqHM6Q3873FFj%2Fcourse-ninja%3Ftype%3Ddesign%26node-id%3D469-3346%26t%3DcEvaiEribLOeqqA3-1%26scaling%3Dscale-down%26page-id%3D0%253A1%26starting-point-node-id%3D96%253A28%26show-proto-sidebar%3D1%26mode%3Ddesign">
            <button type="button" className="p-1 rounded-md flex bg-white" >
                Publish
                <img src="upload-icon.png" alt="upload icon" className="ml-2 flex h-auto w-full" style={{ height: 25 }}></img>
            </button>
        </a>

    </div>
}

export default Navbar


