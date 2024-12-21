import { FunnelIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { memo, useState } from "react"
import { IoRefreshSharp } from "react-icons/io5"
import { useSearchParams } from "react-router-dom"

const FilterMenu = memo(({ resetFilter, addFilter, currFilter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleResetFilter = () => {
    resetFilter()
  }

  const handleFilter = (e) => {
    e.preventDefault()
    console.log(e.target.name, e.target.value)

    addFilter(e.target.name, e.target.value)
  }

  return (
    <>
      <div className="relative z-10 ">
        <div>
          <button
            onClick={handleClick}
            className="p-1 px-2 border-collapse shadow text-black bg-white ring-1 ring-gray-300 rounded-full hover:bg-gray-100 mr-2"
            aria-label="Filter Libraries"
          >
            <FunnelIcon className="size-5 mr-1 inline-block" /> Filters
          </button>
        </div>

        <div
          className={`p-4 mt-3 absolute right-0 w-64 h-50 rounded bg-white shadow-lg ring-1 ring-gray-300 transition-all duration-200 ease-in-out transform ${
            isMenuOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <form className="z-10">
            <div className="font-semibold text-gray-800">Name</div>
            <div className="flex gap-5">
              <label className="my-2 font-semibold text-gray-800">
                <input
                  className="size-3.5 accent-black"
                  type="radio"
                  name="nameOrder"
                  value="ascending"
                  onClick={(e) => handleFilter(e)}
                  checked={currFilter.nameOrder === "ascending"}
                ></input>{" "}
                Ascending
              </label>
              <label className="my-2 font-semibold text-gray-800">
                <input
                  className="size-3.5 accent-black"
                  type="radio"
                  name="nameOrder"
                  value="descending"
                  onClick={(e) => handleFilter(e)}
                  checked={currFilter.nameOrder === "descending"}
                ></input>{" "}
                Descending
              </label>
            </div>
            <div className="mt-3 font-semibold text-gray-800">Date</div>
            <div className="flex gap-5">
              <label className="my-2 font-semibold text-gray-800">
                <input
                  className="size-3.5 accent-black"
                  type="radio"
                  name="dateType"
                  value="old"
                  onClick={(e) => handleFilter(e)}
                  checked={currFilter.dateType === "old"}
                ></input>{" "}
                Old
              </label>
              <label className="my-2 font-semibold text-gray-800">
                <input
                  className="size-3.5 accent-black"
                  type="radio"
                  name="dateType"
                  value="recent"
                  onClick={(e) => handleFilter(e)}
                  checked={currFilter.dateType === "recent"}
                ></input>{" "}
                Recent
              </label>
            </div>

            <button
              onClick={handleResetFilter}
              type="reset"
              className="w-full mt-4 flex items-center justify-center py-1.5 rounded bg-white ring-1 ring-gray-200 text-gray-800 hover:bg-gray-50 font-semibold"
            >
              <IoRefreshSharp className="size-5 rotate-180 transform -scale-y-100 mr-1" />{" "}
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  )
})

export default FilterMenu
