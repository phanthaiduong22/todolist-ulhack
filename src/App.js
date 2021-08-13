import "./App.css";
import { Component } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import { Switch, Route, Link } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>This is Homepage</h1>
      </div>
    );
  }
}

export default App;
