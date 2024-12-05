import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"

export default function SearchFilter() {
  return (
    <>
      {/* <div className="z-40 absolute w-full h-full top-0 left-0 bg-black opacity-40"></div> */}
      <div className="top-14 absolute left-0 flex w-full min-h-full items-center justify-center">
        <div className=" bg-white z-50 h-40 w-96  ring-1 shadow-lg rounded-lg">
          <div className="z-50 py-2 px-2 gap-1 flex items-center w-96 border-b-2  border-gray-400">
            <MagnifyingGlassIcon className="size-6 mr-auto" />
            <input
              type="text"
              className="w-full ring-gray-500 sy outline-none"
              placeholder="Type to search..."
            ></input>
            <XMarkIcon className="ml-auto size-6" />
          </div>
          <center className="h-64">No Recet Searches.</center>
        </div>
      </div>
    </>
  )
}
