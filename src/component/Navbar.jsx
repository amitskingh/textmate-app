import {
  ArrowRightStartOnRectangleIcon,
  Bars2Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import { MdOutlineEmail } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../features/auth/authSlice"
import SearchFilter from "./SearchFilter"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    // console.log(isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }

  const [isSearchActive, setIsSearchActive] = useState(false)

  const dispatch = useDispatch()
  const handleSignOut = () => {
    let response = dispatch(logout())
    // console.log(response)
  }

  const { user } = useSelector((state) => state.auth)
  // console.log(user)

  return (
    <>
      <SearchFilter isActive={isSearchActive} setIsActive={setIsSearchActive} />
      <div className="relative">
        <nav className="sticky top-0 z-30 flex justify-center">
          <div className="md:w-[768px] relative w-full py-8 px-4 flex justify-between items-center h-12 bg-white rounded border-b-4 border-gray-100">
            <div className="flex items-center sm:w-1/2 w-2/3">
              <div
                onClick={() => setIsSearchActive(true)}
                className="flex hover:text-black text-gray-500 items-center h-8 w-full px-2 hover:cursor-pointer ring-1   ring-gray-300 rounded-xl"
              >
                Search...
              </div>
            </div>
            <div className="relative flex gap-2">
              <div className=" rounded-full size-8 flex items-center justify-center">
                {/* <img src="Textmate.png" alt="profile-photo" className="size-6" /> */}
                <UserCircleIcon className="size-8" />
              </div>
              <div
                onClick={handleMenuClick}
                className="hover:cursor-pointer rounded-full size-8 flex items-center justify-center"
              >
                {/* <img src="Textmate.png" alt="profile-photo" className="size-6" /> */}
                <Bars2Icon className="size-8" />
              </div>
              <div
                className={`absolute w-52 py-4 bg-white ring-1 ring-gray-300 shadow rounded-lg top-9 right-5 
                  transition-all duration-300 ease-in-out ${
                    !isMenuOpen
                      ? "-translate-y-8 opacity-0 pointer-events-none visibility-hidden"
                      : "translate-y-0 opacity-100 pointer-events-auto visibility-visible"
                  }
                  `}
              >
                <ul>
                  <div className="flex justify-between items-center ">
                    <a href="#">
                      <li className="hover:bg-gray-200 font-semibold text-gray-800 py-2 px-4">
                        {/* <UserCircleIcon className="size-6 text-blue-500 inline-flex mr-1" /> */}
                        <UserCircleIcon className="size-6 text-blue-500 inline-flex mr-1" />
                        {user.name}
                      </li>
                    </a>
                    <div className="hover:bg-gray-200 flex justify-center p-2 rounded-full items-center mr-2.5">
                      <XMarkIcon
                        onClick={handleMenuClick}
                        className="cursor-pointer size-6 "
                      />
                    </div>
                  </div>
                  <a href="#">
                    <li className="hover:bg-gray-200 font-semibold text-gray-800 py-2 px-4">
                      {/* <Cog6ToothIcon className="size-6 text-blue-500 inline-block mr-1" /> */}
                      <MdOutlineEmail className="size-6 text-blue-500 inline-block mr-1" />
                      {user.email}
                    </li>
                  </a>
                  <li
                    onClick={handleSignOut}
                    className="cursor-pointer hover:bg-gray-200 font-semibold text-gray-800 py-2 px-4"
                  >
                    <ArrowRightStartOnRectangleIcon className="size-6 text-blue-500 inline-block mr-1" />
                    Sign Out
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
