import { useCallback, useEffect, useState } from "react"
import { IoCreateOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import ErrorMessage from "../component/ErrorMessage"
import FilterMenu from "../component/FilterMenu"
import LibraryList from "../component/LibraryList"
import Modal from "../component/Modal"
import Pagination from "../component/Pagination"
import { setCurrentPage } from "../features/library/librarySlice"
import {
  addLibraryThunk,
  deleteLibraryThunk,
  fetchLibraryThunk,
  renameLibraryThunk,
} from "../features/library/libraryThunk"

import { useFilters } from "../hooks/useFilter"

import { toast } from "react-toastify"

import debounce from "lodash/debounce"

export default function Library() {
  const { libraries, status, pagination } = useSelector(
    (state) => state.library
  )

  const { filters, updateFilter, resetFilter } = useFilters()

  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const debouncedFetch = useCallback(
    debounce(() => {
      dispatch(fetchLibraryThunk({ page: pagination.currentPage, ...filters }))
    }, 300),
    [dispatch, pagination.currentPage, filters]
  )

  useEffect(() => {
    debouncedFetch() // This will only run when debouncedFetch is actually recreated

    return () => debouncedFetch.cancel()
  }, [debouncedFetch])

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      newParams.set("page", page)
      return newParams
    })
  }

  // handle the action info for the modal
  const [ModalInfo, setModalInfo] = useState({})
  const handleActionInfo = (type, payload) => {
    let newModalInfo
    if (type === "NEW") {
      newModalInfo = {
        action: "NEW",
        heading: "New Library",
        payload: { placeholder: "Type Library Name....", fileName: "" },
      }
    }
    if (type === "RENAME") {
      newModalInfo = {
        action: "RENAME",
        heading: "Rename Library",
        payload: { fileName: payload.FileName, fileSlug: payload.FileSlug },
      }
    }
    if (type === "DELETE") {
      newModalInfo = {
        action: "DELETE",
        heading: "Delete Library",
        payload: { fileName: payload.FileName, fileSlug: payload.FileSlug },
      }
    }

    setModalInfo(newModalInfo)
  }

  // Handle the different actions
  const handleAction = async (type, payload) => {
    try {
      let response
      if (type === "NEW") {
        response = await dispatch(addLibraryThunk(payload.fileName)).unwrap() // `unwrap` helps catch rejections
        toast.success("Library created successfully!")
      } else if (type === "RENAME") {
        response = await dispatch(
          renameLibraryThunk({
            librarySlug: payload.fileSlug,
            updatedLibraryName: payload.fileName,
          })
        ).unwrap()
        toast.success("Library renamed successfully!")
      } else if (type === "DELETE") {
        response = await dispatch(deleteLibraryThunk(payload.fileSlug)).unwrap()
        setCurrentPage(1)
        toast.success("Library deleted successfully!")
      }

      console.log("Return to modal", response)

      return response
    } catch (ErrorMessage) {
      console.error("Error:", ErrorMessage)
      return { error: ErrorMessage || "An error occurred" }
    }
  }

  // Handle the action dismissal
  const dismissAction = (action) => {
    console.log(action)
    setModalInfo({})
  }

  if (status.fetch.error) {
    return (
      <ErrorMessage error={status.fetch.error.message || "An error occurred"} />
    )
  }

  return (
    <>
      <Modal
        ModalInfo={ModalInfo}
        dismissAction={dismissAction}
        handleAction={handleAction}
        status={status}
      />

      <div className="flext justify-center max-w-[768px] mx-auto">
        {/* Header Buttons */}
        <div className="mt-4 flex justify-between items-center  px-5 mb-4 py-4 border-b-2  ring-1">
          <button
            onClick={() => handleActionInfo("NEW")}
            className="flex items-center p-2 px-2 border-collapse shadow text-white bg-green-600 rounded-lg hover:bg-green-700"
            aria-label="Add New Library"
          >
            <span>New One</span>
            <IoCreateOutline className="size-5 ml-2 inline-flex" />
          </button>

          <FilterMenu
            resetFilter={resetFilter}
            addFilter={updateFilter}
            currFilter={filters}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col max-w-[768px] mx-auto">
        {/* Libraries List */}
        <LibraryList
          loading={status.fetch.loading}
          libraries={libraries}
          handleActionInfo={handleActionInfo}
        />

        {/* Pagination */}
        <Pagination
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
