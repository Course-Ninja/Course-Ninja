import { useContext, useEffect } from "react";
import { ScreensContext, SharedContext } from "../App";
import { TextContext } from "../drags/Draggable";
import { VariableContext, WhiteboardContext } from "../windows/Whiteboard";
import { useEditScreen } from "./utils";

const Variable = () => {
    const { dragid } = useContext(TextContext);
    const { activeScreen, testing } = useContext(SharedContext);
    const { screens } = useContext(ScreensContext)
    const setTestingScreen = useContext(WhiteboardContext)?.setTestingScreen;
    const variableIds = useContext(VariableContext)?.variableIds

    const editScreen = useEditScreen()

    useEffect(() => {
        if (variableIds) {
            const text = variableIds[screens[activeScreen][dragid]["name"]]
            if (testing) {
                setTestingScreen((screen) => {
                    screen[dragid]["name"] = text;
                    return screen
                });
            } else {
                editScreen(dragid, obj => ({ ...obj, name: text }))
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variableIds, activeScreen, dragid, testing, setTestingScreen])

    const screen = screens?.[activeScreen];
    return (
        <div className="text-center text-lg">
            {(screen[dragid] && screen[dragid].variable) ? "" : "Variable"}
        </div>
    );
};

export default Variable;
