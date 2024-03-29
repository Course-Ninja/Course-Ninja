import { useContext, useEffect, useState } from "react";
import { ScreensContext, SharedContext } from "../App";
import { TextContext } from "../drags/Draggable";
import { WhiteboardContext } from "../windows/Whiteboard";

const Text = () => {
    const { dragid } = useContext(TextContext);
    const { activeScreen, testing, setScreens } = useContext(SharedContext);
    const { screens } = useContext(ScreensContext)
    const setTestingScreen = useContext(WhiteboardContext)?.setTestingScreen;

    const handleChange = (text) => {
        if (testing) {
            setTestingScreen((screen) => {
                screen[dragid]["name"] = text;
            });
        } else {
            setScreens((screens) =>
                screens.map((screen, key) => {
                    if (key === activeScreen) {
                        screen[dragid]["name"] = text;
                    }
                    return screen
                })
            );
        }
    };

    const screen = screens?.[activeScreen];
    return (
        <div
            className="text-center text-lg"
            onChange={(event) => handleChange(event.target.value)}
        >
            {(dragid === undefined || screen[dragid]["name"] === "") ? "Text" : ""}
        </div>
    );
};

export default Text;
