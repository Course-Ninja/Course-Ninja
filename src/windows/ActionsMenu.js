import { useContext } from "react";
import { ActionsContext } from "../App";

const ActionsMenu = () => {
    const { actions, setActions } = useContext(ActionsContext);

    const click = () => {
        setActions((elements) => [...elements, { type: "operator" }]);
    };

    const entityClass = "px-1 ring-2 ring-black rounded-lg";

    return (
        <div className="bg-[#D2D2D2] size-full overflow-y-auto rounded">
            <div className="flex justify-between p-2 w-full border-2 border-transparent border-b-black cursor-pointer">
                <span>Actions</span>
                <span className="ring-2 ring-black rounded-full" onClick={click}>
                    +
                </span>
            </div>
            <div className="flex flex-col p-2 gap-2">
                {actions.map((action) => (
                    <div className="flex flex-wrap align-middle gap-2">
                        If
                        <div className={entityClass}>condition</div>
                        &#11157;
                        <div className={entityClass}>action</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActionsMenu;
