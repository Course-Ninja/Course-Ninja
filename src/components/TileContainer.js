import { Children } from "react"
import MenuTile from "./MenuTile"

const TileContainer = ({ children }) => {
    return <div className="flex">
        {Children.map(children, child =>
            <MenuTile>
                {child}
            </MenuTile>
        )}
    </div>
}

export default TileContainer