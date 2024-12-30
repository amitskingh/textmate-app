import { useCallback, useEffect, useState } from "react"
import { IoCreateOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import ErrorMessage from "../component/ErrorMessage"
import FilterMenu from "../component/FilterMenu"
import NoteList from "../component/NoteList"
import Modal from "../component/Modal"
import Pagination from "../component/Pagination"
import {
  setCurrentPage,
  removeFilter,
  setFilter,
} from "../features/note/noteSlice"
import {
  addNoteThunk,
  deleteNoteThunk,
  fetchNoteThunk,
  renameNoteThunk,
} from "../features/note/noteThunk"

import { useFilters } from "../hooks/useFilter"

import { toast } from "react-toastify"

import debounce from "lodash/debounce"

export default function Note() {
  const { librarySlug } = useParams()
  const { notes, status, pagination } = useSelector((state) => state.note)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const { filters, updateFilter, resetFilter } = useFilters(
    "note",
    removeFilter,
    setFilter
  )

  const fetchNotes = useCallback(
    (librarySlug, page, currentFilters) => {
      dispatch(fetchNoteThunk({ librarySlug, page, ...currentFilters }))
    },
    [dispatch]
  )

  const debouncedFetch = useCallback(
    debounce(fetchNotes, 300),
    [fetchNotes] // Only depend on the stable callback
  )

  useEffect(() => {
    const pageFromURL = parseInt(searchParams.get("page") || 1, 10)
    const nameOrderFromURL = searchParams.get("nameOrder")
    const dateTypeFromURL = searchParams.get("dateType")

    // Dispatch actions to initialize Redux state *before* fetching data
    dispatch(setCurrentPage(pageFromURL))
    if (nameOrderFromURL) {
      dispatch(setFilter({ key: "nameOrder", value: nameOrderFromURL }))
    }
    if (dateTypeFromURL) {
      dispatch(setFilter({ key: "dateType", value: dateTypeFromURL }))
    }

    // Now fetch the data (using the possibly updated state)
    const currentFilters = {
      nameOrder: nameOrderFromURL,
      dateType: dateTypeFromURL,
    }
    debouncedFetch(librarySlug, pageFromURL, currentFilters)

    return () => debouncedFetch.cancel()
  }, [dispatch, debouncedFetch, librarySlug, searchParams])

  const handlePageChange = (page) => {
    console.log(page)

    dispatch(setCurrentPage(page))
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      newParams.set("page", page)
      return newParams
    })
  }

  // handle the action info for the modal
  const [ModalInfo, setModalInfo] = useState({
    action: null,
    heading: "",
    payload: { fileName: "", fileSlug: "", placeholder: "" },
  })

  const handleActionInfo = (type, payload) => {
    let newModalInfo
    if (type === "NEW") {
      newModalInfo = {
        action: "NEW",
        heading: "New Note",
        payload: { placeholder: "Type Note Name....", fileName: "" },
      }
    }
    if (type === "RENAME") {
      newModalInfo = {
        action: "RENAME",
        heading: "Rename Note",
        payload: { fileName: payload.FileName, fileSlug: payload.FileSlug },
      }
    }
    if (type === "DELETE") {
      newModalInfo = {
        action: "DELETE",
        heading: "Delete Note",
        payload: { fileName: payload.FileName, fileSlug: payload.FileSlug },
      }
    }

    setModalInfo(newModalInfo)
  }

  // Handle the different actions
  const handleAction = async (type, payload) => {
    try {
      let response
      const updatedPayload = { ...payload } // Create a copy

      if (type === "NEW") {
        response = await dispatch(
          addNoteThunk({ librarySlug, noteName: updatedPayload.fileName })
        ).unwrap() // `unwrap` helps catch rejections
        toast.success("Note created successfully!")
      } else if (type === "RENAME") {
        response = await dispatch(
          renameNoteThunk({
            librarySlug,
            noteSlug: updatedPayload.fileSlug,
            updatedNoteName: updatedPayload.fileName,
          })
        ).unwrap()
        toast.success("Note renamed successfully!")
      } else if (type === "DELETE") {
        response = await dispatch(
          deleteNoteThunk({ librarySlug, noteSlug: updatedPayload.fileSlug })
        ).unwrap()
        setCurrentPage(1)
        toast.success("Note deleted successfully!")
      }

      return response
    } catch (ErrorMessage) {
      return { error: ErrorMessage || "An error occurred" }
    }
  }

  // Handle the action dismissal
  const dismissAction = () => {
    setModalInfo({
      action: null,
      heading: "",
      payload: { fileName: "", fileSlug: "", placeholder: "" },
    })
  }

  if (status.fetch.error) {
    return (
      <ErrorMessage error={status.fetch.error.message || "An error occurred"} />
    )
  }

  console.log(notes)

  return (
    <>
      <Modal
        ModalInfo={ModalInfo}
        handleAction={handleAction}
        dismissAction={dismissAction}
        status={status}
      />

      <div className="flext justify-center max-w-[768px] mx-auto">
        {/* Header Buttons */}
        <div className="mt-4 flex justify-between items-center  px-5 mb-4 py-4 border-b-2">
          <button
            onClick={() => handleActionInfo("NEW")}
            className="flex items-center p-2 px-2 border-collapse shadow text-white bg-green-600 rounded-lg hover:bg-green-700"
            aria-label="Add New Note"
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
        {/* Notes List */}
        <NoteList
          loading={status.fetch.loading}
          notes={notes}
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
