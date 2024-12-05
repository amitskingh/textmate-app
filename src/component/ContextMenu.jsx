import { CgRename } from "react-icons/cg"
import { FolderOpenIcon, TrashIcon } from "@heroicons/react/24/outline"

export function ContextMenu({ handleMenuClick }) {
  return (
    <>
      <div className="z-50 absolute backdrop-blur  shadow-slate-500 rounded-lg  shadow top-0 right-0 h-32 w-32">
        <ul className="">
          <li
            onClick={handleMenuClick}
            className="text-slate-700 hover:bg-black rounded-lg hover:text-white cursor-pointer mx-auto p-2"
          >
            <FolderOpenIcon className="size-4 inline-block mr-2" />
            Open
          </li>
          <li
            onClick={handleMenuClick}
            className="text-slate-700 hover:bg-black rounded-lg hover:text-white cursor-pointer mx-auto p-2"
          >
            <CgRename className="size-4 inline-block mr-2" />
            Rename
          </li>
          <li
            onClick={handleMenuClick}
            className="text-slate-700 hover:bg-black rounded-lg hover:text-white cursor-pointer mx-auto p-2"
          >
            <TrashIcon className="size-4 inline-block mr-2" />
            Delete
          </li>
        </ul>
      </div>
    </>
  )
}
