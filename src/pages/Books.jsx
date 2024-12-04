import { Link } from "react-router-dom"
import { MdFolder } from "react-icons/md"
import { BsThreeDotsVertical } from "react-icons/bs"
import { BsJournalRichtext } from "react-icons/bs"

import { useState } from "react"
import { ContextMenu } from "../component/ContextMenu"

export default function Books() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [bottomBorder, setBottomBorder] = useState(false)

  // Simplify the handleBottomBorder logic
  const handleBottomBorder = (isHovered) => {
    setBottomBorder(isHovered) // Show or hide bottom border based on hover state
  }

  const handleMenuClick = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <>
      <div
        onMouseEnter={() => handleBottomBorder(true)} // Hover starts
        onMouseLeave={() => handleBottomBorder(false)} // Hover ends
        className="md:grid md:grid-rows-4 flex flex-col max-w-[768px] mx-auto"
      >
        <div className="relative my-3 mx-2 px-2 flex items-center pb-1">
          <BsJournalRichtext className="size-12 mr-2" />
          <div className="w-full">
            <div className="relative flex justify-between">
              <Link className="text-stone-700">Data Structures</Link>
              <button>
                <BsThreeDotsVertical
                  className="size-4"
                  onClick={handleMenuClick}
                />
              </button>
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-light cursor-default">12-Mar-2023</p>
              <p className="text-xs font-light cursor-default">3 item</p>
            </div>
          </div>
          {bottomBorder && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-2 h-[3px]" />
          )}
          {isOpenMenu && <ContextMenu />}{" "}
        </div>
      </div>
    </>
  )
}
