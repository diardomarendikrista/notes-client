import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layouts/index";
import Home from "./pages/Home";
import Note from "./pages/Notes";
import NoteAdd from "./pages/Notes/Add";
import NoteEdit from "./pages/Notes/Edit";
import NoteDetail from "./pages/Notes/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/notes",
    element: (
      <Layout>
        <Note />
      </Layout>
    ),
  },
  {
    path: "/notes/show/:id",
    element: (
      <Layout>
        <NoteDetail />
      </Layout>
    ),
  },
  {
    path: "/notes/edit/:id",
    element: (
      <Layout>
        <NoteEdit />
      </Layout>
    ),
  },
  {
    path: "/notes/add",
    element: (
      <Layout>
        <NoteAdd />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
