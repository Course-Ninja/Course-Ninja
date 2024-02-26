import { Children } from "react"
import MenuTile from "./MenuTile"

const TileContainer = ({ children }) => {
    return <div className="flex overflow-x-auto">
        {Children.map(children, child =>
            <MenuTile>
                {child}
            </MenuTile>
        )}
    </div>
}

export default TileContainer