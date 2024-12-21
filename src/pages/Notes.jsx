import { FunnelIcon, PlusIcon } from "@heroicons/react/24/outline"
import { FaRegNoteSticky } from "react-icons/fa6"
import FileContent from "../component/FileContent"

export default function Library() {
  const handleDismiss = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="mt-4 flex flex-col max-w-[768px] mx-auto">
        <div className="mx-5 mt-4 mb-7 pb-6 border-b-2 flex gap-6 items-center bg-white ">
          <div className="p-2 px-2 border-collapse shadow cursor-pointer shadow-slate-400 text-white bg-green-600 rounded-lg hover:cursor-pointer">
            <span>New One</span>
            <PlusIcon className="size-5 ml-2 inline-block" />
          </div>
          <div className="p-2 px-2 border-collapse shadow shadow-slate-400 text-gray-100 bg-gray-700  rounded-lg hover:cursor-pointer">
            <FunnelIcon className="size-5 mr-1 inline-block" /> Filters
          </div>
        </div>
        <FileContent
          Icon={FaRegNoteSticky}
          FileName={"Data Structures"}
          DateCreated={"12-Mar-2023"}
          TotalItems={3}
        />
      </div>
    </>
  )
}
