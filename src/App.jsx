import React from "react";
import "./App.css";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "components/Loader/Loader";

const Layout = lazy(() => import("./Layouts/index"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NoteAdd = lazy(() => import("./pages/Dashboard/Notes/Add"));
const NoteEdit = lazy(() => import("./pages/Dashboard/Notes/Edit"));
const NoteDetail = lazy(() => import("./pages/Dashboard/Notes/Detail"));

const TodoAdd = lazy(() => import("./pages/Dashboard/Todo/Add"));

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
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "notes/show/:id",
    element: (
      <Layout>
        <NoteDetail />
      </Layout>
    ),
  },
  {
    path: "/dashboard/notes/edit/:id",
    element: (
      <Layout>
        <NoteEdit />
      </Layout>
    ),
  },
  {
    path: "/dashboard/notes/add",
    element: (
      <Layout>
        <NoteAdd />
      </Layout>
    ),
  },
  {
    path: "/dashboard/todo/add",
    element: (
      <Layout>
        <TodoAdd />
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
