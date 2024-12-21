import { TrashIcon } from "@heroicons/react/24/outline"
import { CgRename } from "react-icons/cg"
import { Link } from "react-router-dom"

export default function FileContent({
  Icon,
  FileName,
  DateCreated,
  TotalItems,
  handleActionInfo,
  FileSlug,
}) {
  return (
    <>
      <div className="border-b-2 border-b-gray-300 border-dashed my-3 mx-2 px-2 flex items-center pb-2">
        <div>
          <Icon className="text-amber-500 size-12 mr-2" />
        </div>
        <div className="w-full flex justify-between">
          <div className="relative flex flex-col flex-wrap  sm:max-w-96 max-w-32">
            <Link className="max-w-full text-slate-600">
              <p className="truncate hover:border-b-2 hover:border-b-blue-600 border-b-2">
                {FileName}
              </p>
            </Link>
            <div className="flex gap-2 items-end">
              <p className="text-xs font-light cursor-default">{DateCreated}</p>
              <p className="text-xs font-light cursor-default">|</p>
              <p className="text-xs font-light cursor-default">
                {TotalItems} items
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => handleActionInfo("RENAME", { FileName, FileSlug })}
            >
              <CgRename className="size-6 text-gray-700 hover:text-blue-600" />
            </button>
            <button
              onClick={() => handleActionInfo("DELETE", { FileName, FileSlug })}
            >
              <TrashIcon className="size-6 text-gray-700 hover:text-rose-600" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
