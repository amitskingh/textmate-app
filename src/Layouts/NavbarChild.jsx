import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"

export default function NavbarChild() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
