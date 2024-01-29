// import logo from './logo.svg';
import './App.css';
import Draggable from './Draggable'
import EditorPane from './EditorPane'
import Whiteboard from './Whiteboard';

function App() {
  return (
    <div className="App">
      <div id="editor" className="flex grid grid-cols-4 h-dvh">
        <EditorPane className="grid grid-cols-2">
          <Draggable type="BOX">
            <rect x="20" width="50" height="100" fill="black"/>
          </Draggable>
          <Draggable type="BOX">
            <circle cx="50" cy="50" r="25" fill="grey" id="grey-circle"/>
          </Draggable>
          <Draggable type="BOX">
            <rect width="100" height="100" fill="red" id="red-square"/>
          </Draggable>
          <Draggable type="BOX">
            <circle cx="50" cy="50" r="50" fill="blue"/>
          </Draggable>
          <Draggable type="BOX">
            <rect width="100" height="100" fill="yellow"/>
          </Draggable>
          <Draggable type="BOX">
            <rect width="100" height="100" fill="green"/>
          </Draggable>
        </EditorPane>
        <Whiteboard className="rounded-md border-4 border-slate-500 col-span-3 flex items-center justify-center" accepttype="BOX"><p>Whiteboard</p></Whiteboard>
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
