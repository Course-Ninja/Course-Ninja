// import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import EditorPane from './windows/EditorPane'
import Whiteboard from './windows/Whiteboard';
import ShapesTab from './tabs/ShapesTab';
import InsertTab from './tabs/InsertTab';
import TextTab from './tabs/TextTab';
import TabsPane from './windows/TabsPane'
import ToolboxTab from './tabs/ToolboxTab';
import ThemesTab from './tabs/ThemesTab';
import DrawTab from './tabs/DrawTab';
import ActionsTab from './tabs/ActionsTab';
import Navbar from './windows/Navbar';
import ActionsMenu from './windows/ActionsMenu';
import Screens from './windows/Screens';

export const ElementsContext = createContext()
export const ScreensContext = createContext()

const defaultTab = "Shapes"
export const TabContext = createContext(defaultTab)

function App() {
  const [elements, setElements] = useState({})
  const [objRef, setObjRefs] = useState({})
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [tabs, setTabs] = useState({})
  const [screens, setScreens] = useState([<p className="select-none">Whiteboard</p>])
  const [activeScreen, setActiveScreen] = useState(0)

  return <>
    <div className="App flex flex-col bg-slate-200 h-dvh">
      <Navbar />
      <div className='flex flex-grow'>
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
          <TabsPane>
            {Object.entries(tabs).map(([, elems]) => elems)}
          </TabsPane>
        </TabContext.Provider>
        <div id="editor" className="flex flex-col flex-grow justify-between">
          <ElementsContext.Provider value={{ elements, setElements, objRef, setObjRefs, setTabs, activeTab }}>
            <div className='flex h-full m-8 mr-0'>
              <ScreensContext.Provider value={{ setScreens, screens, setActiveScreen }}>
                {screens.map((element, key) => <div className={`flex flex-grow ${activeScreen===key ? "" : "hidden"}`} key={key}>
                  <Whiteboard>
                    {element}
                  </Whiteboard>
                </div>)}
                <div className='grid grid-rows-2 w-1/6'>
                  <div className='m-2 mt-0 flex items-center'>
                    <ActionsMenu />
                  </div>
                  <div className='m-2 mb-0 flex items-center'>
                    <Screens />
                  </div>
                </div>
              </ScreensContext.Provider>
            </div>
            <EditorPane>
              <ShapesTab name="Shapes"></ShapesTab>
              <InsertTab name="Insert"></InsertTab>
              <TextTab name="Text"></TextTab>
              <ThemesTab name="Themes"></ThemesTab>
              <DrawTab name="Draw"></DrawTab>
              <ToolboxTab name="Toolbox"></ToolboxTab>
              <ActionsTab name="Actions"></ActionsTab>
            </EditorPane>
          </ElementsContext.Provider>
        </div>
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
  </>;
}

export default App;
