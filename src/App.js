import "./App.css";
import { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return <Redirect to={"/home"} replace />;
  }
}

export default App;
