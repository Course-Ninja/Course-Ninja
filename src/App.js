// import logo from './logo.svg';
import './App.css';
import Draggable from './Draggable'
import EditorPane from './EditorPane'
import Whiteboard from './Whiteboard';

function App() {
  return (
    <div className="App">
      <div className="editor" class="flex">
        <EditorPane>
          <Draggable class="border-8 border-sky-500 h-dvh">Hi</Draggable>
        </EditorPane>
        <Whiteboard></Whiteboard>
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
