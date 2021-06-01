import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Note from "./pages/Note";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/notes">
          <Note />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
