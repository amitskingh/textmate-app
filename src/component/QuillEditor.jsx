import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNoteContent } from "../hooks/useNoteContent"
import Editor from "./Editor"

import { ArrowPathIcon } from "@heroicons/react/24/outline"

import "quill/dist/quill.snow.css"
import ErrorMessage from "./ErrorMessage"
import LoadingLarge from "./LoadingLarge"

import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

function QuillEditor() {
  const { librarySlug, noteSlug } = useParams() // Extract params from the URL

  const {
    content,
    saveStatus,
    loading,
    error,
    fetchNoteContent,
    handleContentChange, // Use this for real-time updates
  } = useNoteContent()

  const [range, setRange] = useState()
  const [readOnly, setReadOnly] = useState(false)

  // Use a ref to access the quill instance directly
  const quillRef = useRef()

  useEffect(() => {
    if (librarySlug && noteSlug) {
      console.log("Fetching")

      fetchNoteContent(librarySlug, noteSlug) // Fetch note content
    }
  }, [librarySlug, noteSlug])

  useEffect(() => {
    if (quillRef.current && content) {
      quillRef.current.setContents(content)
    }
  }, [content, quillRef, librarySlug, noteSlug])

  const debouncedSave = useCallback(() => {
    if (quillRef.current) {
      const quillContent = quillRef.current.getContents().ops
      handleContentChange(quillContent, librarySlug, noteSlug)
    }
  }, [quillRef, handleContentChange, librarySlug, noteSlug])

  const [status, setStatus] = useState("")
  useEffect(() => {
    console.log(saveStatus)
    if (saveStatus === "saving") {
      setStatus("Saving...")
    } else if (saveStatus === "success") {
      setStatus("Successfull Saved")
      setTimeout(() => setStatus(""), 2000)
    } else if (saveStatus === "error") {
      setStatus("Error saving")
    }
  }, [saveStatus])

  if (loading) {
    return <LoadingLarge />
  }
  if (error) {
    return <ErrorMessage error={error} />
  }

  return (
    <div className="max-w-[768px] mx-auto">
      <div className="px-2 mb-4">
        <div className="top-0 fixed z-50 flex">
          <button
            onClick={debouncedSave}
            className={`px-4 pt-1 ml-1 mt-1 flex justify-center items-center cursor-pointer bg-gray-50 ring-1 hover:text-blue-600 ring-gray-300`}
          >
            <ArrowPathIcon className="size-4 inline-block mr-1" /> Save
          </button>
          <div
            className={`px-2 pt-1 ml-1 mt-1 flex justify-center items-center ${
              saveStatus === "saving"
                ? "text-blue-600"
                : saveStatus === "success"
                ? "text-green-600"
                : "text-red-600"
            } ring-gray-300`}
          >
            {status}
          </div>
        </div>

        <Editor
          ref={quillRef}
          readOnly={readOnly}
          onSelectionChange={setRange} // Update selection range
          onTextChange={debouncedSave} // Correctly handle Quill's TEXT_CHANGE event
        />
      </div>
    </div>
  )
}

export default QuillEditor
