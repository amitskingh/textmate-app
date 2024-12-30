import React, { useCallback, useEffect, useRef, useState } from "react"
import Editor from "./Editor"
import { useNoteContent } from "../hooks/useNoteContent"

import { ArrowPathIcon } from "@heroicons/react/24/outline"

import "quill/dist/quill.snow.css"
import LoadingLarge from "./LoadingLarge"
import ErrorMessage from "./ErrorMessage"

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
  const [lastChange, setLastChange] = useState()
  const [readOnly, setReadOnly] = useState(false)

  // Use a ref to access the quill instance directly
  const quillRef = useRef()

  useEffect(() => {
    if (librarySlug && noteSlug) {
      fetchNoteContent(librarySlug, noteSlug) // Fetch note content
    }
  }, [])

  useEffect(() => {
    if (quillRef.current && content) {
      // Wait until Quill is initialized and content is fetched
      const quill = quillRef.current

      // Set the content in the editor
      quill.setContents(content)
    }
  }, [content, quillRef])

  const handleSave = useCallback(() => {
    if (quillRef.current) {
      const quillContent = quillRef.current.getContents().ops
      handleContentChange(quillContent, librarySlug, noteSlug)
    }
  }, [quillRef, handleContentChange, librarySlug, noteSlug])

  const [status, setStatus] = useState("Save")

  useEffect(() => {
    console.log(saveStatus)

    if (saveStatus.saving === true) {
      setStatus("Saving...")
    } else if (saveStatus.savedStatus === "success") {
      setStatus("Successfully saved")
      setTimeout(() => {
        setStatus("Save")
      }, 1500)
    } else if (saveStatus.savedStatus === "failed") {
      setStatus("Failed saving")
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
        <div
          onClick={handleSave}
          className={`px-4 pt-1 ml-1 mt-1 flex justify-center items-center cursor-pointer top-0 fixed z-50 bg-gray-50 ring-1 hover:text-blue-600 ring-gray-300`}
        >
          <ArrowPathIcon className="size-4 inline-block mr-1" /> {status}
        </div>

        <Editor
          ref={quillRef}
          readOnly={readOnly}
          onSelectionChange={setRange} // Update selection range
          onTextChange={handleSave} // Correctly handle Quill's TEXT_CHANGE event
        />
      </div>
    </div>
  )
}

export default QuillEditor
