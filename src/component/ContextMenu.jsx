import { CgRename } from "react-icons/cg"
import { FolderOpenIcon, TrashIcon } from "@heroicons/react/24/outline"

export function ContextMenu() {
  return (
    <>
      <div className="z-50 absolute shadow-slate-500 rounded-sm bg-white shadow top-0 right-6 h-32 w-32">
        <ul className="">
          <li className="text-slate-700 hover:bg-black hover:text-white cursor-pointer mx-auto p-2">
            <FolderOpenIcon className="size-4 inline-block mr-2" />
            Open
          </li>
          <li className="text-slate-700 hover:bg-black hover:text-white cursor-pointer mx-auto p-2">
            <CgRename className="size-4 inline-block mr-2" />
            Rename
          </li>
          <li className="text-slate-700 hover:bg-black hover:text-white cursor-pointer mx-auto p-2">
            <TrashIcon className="size-4 inline-block mr-2" />
            Delete
          </li>
        </ul>
      </div>
    </>
  )
}
