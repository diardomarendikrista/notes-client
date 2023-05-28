import React from "react";
import "./App.css";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "components/Loader/Loader";

const Layout = lazy(() => import("./Layouts/index"));
const Home = lazy(() => import("./pages/Home"));
const Note = lazy(() => import("./pages/Notes"));
const NoteAdd = lazy(() => import("./pages/Notes/Add"));
const NoteEdit = lazy(() => import("./pages/Notes/Edit"));
const NoteDetail = lazy(() => import("./pages/Notes/Detail"));

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
    <React.Suspense fallback={<Loader center />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
