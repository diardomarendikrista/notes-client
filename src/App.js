import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Note from "./pages/Note/Note";
import NoteAdd from "./pages/NoteAdd";
import NoteEdit from "./pages/NoteEdit";
import NoteDetail from "./pages/NoteDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/notes/show/:id">
          <NoteDetail />
        </Route>
        <Route path="/notes/edit/:id">
          <NoteEdit />
        </Route>
        <Route path="/notes/add">
          <NoteAdd />
        </Route>
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
