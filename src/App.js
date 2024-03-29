// import logo from './logo.svg';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import EditorPane from './windows/EditorPane'
import Whiteboard from './windows/Whiteboard';
import ShapesTab from './tabs/ShapesTab';
import InsertTab from './tabs/InsertTab';
import FruitsTab from './tabs/FruitsTab';
import TabsPane from './windows/TabsPane'
import ToolboxTab from './tabs/ToolboxTab';
import ThemesTab from './tabs/ThemesTab';
import DrawTab from './tabs/DrawTab';
import ActionsTab from './tabs/ActionsTab';
import Navbar from './windows/Navbar';
import ActionsMenu from './windows/ActionsMenu';
import Screens from './windows/Screens';
import TestRun from './windows/TestRun'
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root")
export const SharedContext = createContext()
export const EditorContext = createContext()
export const ScreensContext = createContext()
export const ActionsContext = createContext()

const defaultTab = "Fruits"
export const TabContext = createContext(defaultTab)

function App() {
  const [objRef, setObjRefs] = useState({})
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [tabs, setTabs] = useState({})
  const [screens, setScreens] = useState([{}])
  const [actions, setActions] = useState([{}])
  const [activeScreen, setActiveScreen] = useState(0)
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    // gives prompt to close window
    window.onbeforeunload = () => {
      for (const screen of screens) {
        if (Object.entries(screen).length) return true
      }
      return undefined
    }
  }, [screens])

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
          <SharedContext.Provider value={{ testing, activeScreen, setScreens }}>
            <ScreensContext.Provider value={{ objRef, screens, setActiveScreen, setTesting }}>
              <div className='flex h-full m-8 mr-0'>
                <Whiteboard>
                  {screens[activeScreen]}
                </Whiteboard>
                <div className='flex flex-col w-1/6'>
                  <TestRun />
                  <div className='m-2 h-1/2 h-px grow'>
                    <ActionsContext.Provider value={{ actions, setActions }}>
                      <ActionsMenu />
                    </ActionsContext.Provider>
                  </div>
                  <div className='m-2 mb-0 h-px grow'>
                    <Screens />
                  </div>
                </div>
              </div>
              <EditorContext.Provider value={{ setObjRefs, setTabs, activeTab }}>
                <EditorPane>
                  <ShapesTab name="Shapes"></ShapesTab>
                  <InsertTab name="Insert"></InsertTab>
                  <FruitsTab name="Fruits"></FruitsTab>
                  <ThemesTab name="Themes"></ThemesTab>
                  <DrawTab name="Draw"></DrawTab>
                  <ToolboxTab name="Toolbox"></ToolboxTab>
                  <ActionsTab name="Actions"></ActionsTab>
                </EditorPane>
              </EditorContext.Provider>
            </ScreensContext.Provider>
          </SharedContext.Provider>
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
