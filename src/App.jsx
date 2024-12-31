import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import NotFound from "./component/NotFound"
import NavbarChild from "./Layouts/NavbarChild"
import Home from "./pages/Home"
import Library from "./pages/Library"
import Login from "./pages/Login"
import Notes from "./pages/Notes"
import Registeration from "./pages/Registration"
import Temp from "./pages/Temp"

import { ToastContainer } from "react-toastify"
import QuillEditor from "./component/QuillEditor"
import Editor from "quill/core/editor"
import ProtectedRoute from "./routes/ProtectedRoute"
import SearchFilter from "./component/SearchFilter"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Registeration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/library",
    element: (
      <ProtectedRoute>
        <NavbarChild />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Library />
          </ProtectedRoute>
        ),
      },
      {
        path: ":librarySlug/note",
        element: (
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/library/:librarySlug/note/:noteSlug",
    element: (
      <ProtectedRoute>
        <QuillEditor />
      </ProtectedRoute>
    ),
  },
  {
    path: "search",
    element: <SearchFilter />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

function App() {
  return (
    <>
      <ToastContainer position="bottom-center" />

      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
