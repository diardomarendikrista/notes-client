import React, { useEffect } from "react";
import "./App.css";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "components/Loader/Loader";
import { useDispatch } from "react-redux";

const Layout = lazy(() => import("./Layouts/index"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NoteAdd = lazy(() => import("./pages/Dashboard/Notes/Add"));
const NoteEdit = lazy(() => import("./pages/Dashboard/Notes/Edit"));
const NoteDetail = lazy(() => import("./pages/Dashboard/Notes/Detail"));

const TodoForm = lazy(() => import("./pages/Dashboard/Todo/Form"));

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
        <TodoForm />
      </Layout>
    ),
  },
  {
    path: "/dashboard/todo/edit/:id",
    element: (
      <Layout>
        <TodoForm />
      </Layout>
    ),
  },
  {
    path: "todo/show/:id",
    element: (
      <Layout>
        <NoteDetail />
      </Layout>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window?.location?.hostname === "localhost") {
      dispatch({ type: "global/setIsDevelopment", payload: true });
    }
  }, [dispatch]);

  return (
    <React.Suspense fallback={<Loader center />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
