import { Link } from "react-router-dom"
import { BsThreeDotsVertical, BsJournalRichtext } from "react-icons/bs"
import { useState } from "react"
import { ContextMenu } from "../component/ContextMenu"
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline"

export default function Library() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [bottomBorder, setBottomBorder] = useState(false)

  // Handle menu click
  const handleMenuClick = (e) => {
    e.stopPropagation() // Prevent event bubbling
    setIsOpenMenu((prev) => !prev)
  }

  // Close menu when clicking outside
  const handleBackdropClick = () => {
    setIsOpenMenu(false)
  }

  return (
    <>
      {/* Backdrop for closing menu */}
      {isOpenMenu && (
        <div
          onClick={handleBackdropClick}
          className="absolute inset-0 bg-transparent"
        ></div>
      )}

      <div className="mt-4 flex flex-col max-w-[768px] mx-auto">
        <div className="mx-5 mt-4 mb-7 pb-6 border-b-2 flex gap-6 items-center bg-white ">
          <div className="p-2 px-2 border-collapse shadow cursor-pointer shadow-slate-400 text-gray-800 rounded-lg hover:cursor-pointer">
            <span>New One</span>
            <PlusIcon className="size-5 ml-2 inline-block" />
          </div>
          <div className="p-2 px-2 border-collapse shadow shadow-slate-400 text-gray-800 rounded-lg hover:cursor-pointer">
            <FunnelIcon className="size-5 mr-1 inline-block" /> Filters
          </div>
        </div>
        <div
          onMouseEnter={() => setBottomBorder(true)} // Explicitly set hover state
          onMouseLeave={() => setBottomBorder(false)} // Explicitly unset hover state
          className="relative my-3 mx-2 px-2 flex items-center pb-1"
        >
          <BsJournalRichtext className="text-blue-500 size-12 mr-2" />
          <div className="w-full">
            <div className="relative flex justify-between">
              <Link className="text-slate-600">Data Structures</Link>
              <button onClick={handleMenuClick}>
                <BsThreeDotsVertical className="size-4" />
              </button>
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-light cursor-default">12-Mar-2023</p>
              <p className="text-xs font-light cursor-default">3 items</p>
            </div>
          </div>

          {/* Bottom border on hover */}
          {bottomBorder && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-[3px]" />
          )}

          {/* Context Menu */}
          {isOpenMenu && (
            <ContextMenu
              handleMenuClick={handleMenuClick}
              className="z-20" // Ensure it's above the backdrop
            />
          )}
        </div>
      </div>
    </>
  )
}
