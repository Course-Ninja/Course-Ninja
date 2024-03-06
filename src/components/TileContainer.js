import { Children } from "react"
import MenuTile from "./MenuTile"

const TileContainer = ({ children }) => {
    return <div className="grid grid-cols-2 auto-rows-min">
        {Children.map(children, child =>
            <MenuTile>
                {child}
            </MenuTile>
        )}
    </div>
}

export default TileContainer