import { useContext, useEffect, useState } from "react";
import { ScreensContext, SharedContext } from "../App";
import { TextContext } from "../drags/Draggable";
import { WhiteboardContext } from "../windows/Whiteboard";

const Text = () => {
    const { dragId, setDragId } = useContext(TextContext);
    const { activeScreen, testing, setScreens } = useContext(SharedContext);
    const screens = useContext(ScreensContext)?.screens;
    const setTestingScreen = useContext(WhiteboardContext)?.setTestingScreen;

    const handleChange = (text) => {
        if (testing) {
            setTestingScreen((screen) => {
                screen[dragId]["name"] = text;
            });
        } else {
            setScreens((screens) =>
                screens.map((screen, key) => {
                    if (key === activeScreen) {
                        screen[dragId]["name"] = text;
                    }
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
            {dragId == null || screen[dragId]["name"] == "" ? "Text" : ""}
        </div>
    );
};

export default Text;
