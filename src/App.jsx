import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Books from "./pages/Books"
import Temp from "./pages/Temp"
import QuillEditor from "./component/QuillEditor"
import Navbar from "./component/Navbar"
import SearchFilter from "./component/SearchFilter"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/edit",
    element: <QuillEditor />,
  },
  {
    path: "/navbar",
    element: <Navbar />,
    children: [
      {
        path: "edit",
        element: <QuillEditor />,
      },
    ],
  },
  {
    path: "/search",
    element: <SearchFilter />,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
