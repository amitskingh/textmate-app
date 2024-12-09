import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react"
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import SearchFilter from "./SearchFilter"
import Books from "../pages/Library"
import QuillEditor from "./QuillEditor"

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    console.log(isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <div className="relative">
        <nav className="sticky top-0 z-40 flex justify-center">
          <div className="md:w-[768px] relative w-full py-8 px-4 flex justify-between items-center h-12 bg-white rounded border-b-4 border-gray-100">
            <div className="flex items-center sm:w-1/2 w-2/3">
              <div className="flex hover:text-black text-gray-500 items-center h-8 w-full px-2 hover:cursor-pointer ring-1   ring-gray-500 rounded-xl">
                Search...
              </div>
            </div>
            <div className="relative flex gap-2">
              <div className=" rounded-full size-8 flex items-center justify-center">
                <img src="Textmate.png" className="size-6" />
              </div>
              <div
                onClick={handleMenuClick}
                className="hover:cursor-pointer rounded-full ring-4 size-8 flex items-center justify-center"
              >
                <img src="" className="size-6" />
              </div>
              <div
                className={`absolute w-52 py-4 bg-gray-50 drop-shadow-2xl backdrop-blur-3xl rounded-lg top-9 right-5 
                  transition-all duration-300 ease-in-out ${
                    !isMenuOpen
                      ? "-translate-y-8 opacity-0 pointer-events-none visibility-hidden"
                      : "translate-y-0 opacity-100 pointer-events-auto visibility-visible"
                  }
                  `}
              >
                <ul>
                  <div className="flex justify-between items-center ring-1 ring-red-500">
                    <a href="#">
                      <li className="py-2 px-4 hover:text-purple-600">
                        <UserCircleIcon className="size-6 text-purple-600 inline-flex mr-1" />
                        Your Profile
                      </li>
                    </a>
                    <div className="flex justify-center items-center mr-2.5">
                      <XMarkIcon
                        onClick={handleMenuClick}
                        className="cursor-pointer hover:text-purple-600 size-6 "
                      />
                    </div>
                  </div>
                  <a href="#">
                    <li className="py-2 px-4 hover:text-purple-600">
                      <Cog6ToothIcon className="size-6 text-purple-600 inline-block mr-1" />
                      Setting
                    </li>
                  </a>
                  <a href="#">
                    <li className="py-2 px-4 hover:text-purple-600">
                      <ArrowRightStartOnRectangleIcon className="size-6 text-purple-600 inline-block mr-1" />
                      Sign Out
                    </li>
                  </a>
                </ul>
              </div>
            </div>
            {/* <div className="absolute top-10 left-0 min bg-black rounded-lg mx-4 w-full h-96"></div> */}
          </div>
        </nav>
      </div>
      {/* <Books /> */}
    </>
  )
}
