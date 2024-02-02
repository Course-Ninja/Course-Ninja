// import logo from './logo.svg';
import './App.css';
import EditorPane from './windows/EditorPane'
import Whiteboard from './windows/Whiteboard';
import ShapesTab from './tabs/ShapesTab';
import InsertTab from './tabs/InsertTab';
import TextTab from './tabs/TextTab';
import { createContext, useState } from 'react';
import ToolboxTab from './tabs/ToolboxTab';
import ThemesTab from './tabs/ThemesTab';
import DrawTab from './tabs/DrawTab';
import ActionsTab from './tabs/ActionsTab';

export const ElementsContext = createContext()

function App() {
  const [elements, setElements] = useState({})
  return (
    <div className="App">
      <div id="editor" className="flex grid grid-cols-4 h-dvh">
        <ElementsContext.Provider value={{elements, setElements}}>
          <EditorPane>
            <ShapesTab id="Shapes"/>
            <InsertTab id="Insert"/>
            <TextTab id="Text"/>
            <ThemesTab id="Themes"/>
            <DrawTab id="Super long name"/>
            <ToolboxTab id="Toolbox"/>
            <ActionsTab id="Actions"/>
          </EditorPane>
          <Whiteboard><p>Whiteboard</p></Whiteboard>
        </ElementsContext.Provider>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
