import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Books from "./pages/Books"
import Temp from "./pages/Temp"
import QuillEditor from "./component/QuillEditor"

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
    path: "/temp",
    element: <Temp />,
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
