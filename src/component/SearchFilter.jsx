import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"

export default function SearchFilter({ isActive, setIsActive }) {
  if (!isActive) {
    document.body.style.marginRight = `0`
    document.body.style.overflow = "auto"
    return null
  } else {
    let scrollWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = "hidden"

    // ReactStrictMode sucks causing twice render so in second render scrollWidth is 0
    if (scrollWidth != 0) {
      document.body.style.marginRight = `${scrollWidth}px`
    }
  }
  return (
    <>
      <div className="z-40 absolute w-full h-full top-0 left-0 bg-black opacity-40"></div>
      <div className="top-14 absolute z-50 left-0 flex w-full h-full items-center justify-center">
        <div className=" bg-white z-50  w-96  ring-1 shadow-lg rounded-lg">
          <div className="z-50 py-2 px-2 gap-1 flex items-center w-96 border-b-2  border-gray-400">
            <MagnifyingGlassIcon className="size-6 mr-auto" />
            <input
              type="text"
              className="w-full ring-gray-500 sy outline-none"
              placeholder="Type to search..."
            ></input>
            <XMarkIcon
              onClick={() => setIsActive(false)}
              className="ml-auto cursor-pointer hover:bg-gray-300 rounded-full size-6"
            />
          </div>
          <div className="h-64 text-center overflow-y-scroll">
            Coming Soon...
          </div>
        </div>
      </div>
    </>
  )
}
