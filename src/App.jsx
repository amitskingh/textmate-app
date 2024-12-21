import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Library from "./pages/Library"
import Notes from "./pages/Notes"
import Temp from "./pages/Temp"
import QuillEditor from "./component/QuillEditor"
import NavbarChild from "./Layouts/NavbarChild"
import Login from "./pages/Login"
import Registeration from "./pages/Registration"
import NotFound from "./component/NotFound"

import { ToastContainer } from "react-toastify"

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
    element: <NavbarChild />,
    children: [
      {
        index: true,
        element: <Library />,
      },
      {
        path: ":librarySlug/notes",
        element: <Notes />,
      },
      {
        path: "temp",
        element: <Temp />,
      },
    ],
  },
  {
    path: "/temp",
    element: <Temp />,
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
