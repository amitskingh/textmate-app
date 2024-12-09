import { CgRename } from "react-icons/cg"
import {
  FolderOpenIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

export function ContextMenu({ handleMenuClick }) {
  return (
    <>
      {/* <div className="absolute inset-0 h-full w-full"></div> */}
      <div className="z-50 absolute bg-white  shadow-slate-500 rounded  shadow top-0 right-0 h-36 w-44">
        <ul className="">
          <li
            onClick={handleMenuClick}
            className="text-slate-700 hover:bg-gray-200 rounded-lg hover:text-black cursor-pointer py-2.5 mx-auto p-2"
          >
            <FolderOpenIcon className="size-4 inline-block mr-2" />
            Open
          </li>
          <li
            onClick={handleMenuClick}
            className="text-slate-700 hover:bg-gray-200 rounded-lg hover:text-black cursor-pointer py-2.5 mx-auto p-2"
          >
            <CgRename className="size-4 inline-block mr-2" />
            Rename
          </li>
          <li
            onClick={handleMenuClick}
            className="text-slate-700 hover:bg-gray-200 rounded-lg hover:text-black cursor-pointer py-2.5 mx-auto p-2"
          >
            <TrashIcon className="size-4 inline-block mr-2" />
            Delete
          </li>
        </ul>
      </div>
    </>
  )
}
