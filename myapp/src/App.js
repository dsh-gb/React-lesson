import logo from './logo.svg';
import './App.css';
const msgStr = "Welcome React";

function Message(props) {
  return <p className="message">Message - {props.text}</p>
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>First React app</h1>
        <Message text={msgStr} />
      </header>
    </div>
  );
}

export default App;
