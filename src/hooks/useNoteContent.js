import { useState, useCallback, useEffect, useRef } from "react"
import axiosInstance from "../api/axiosConfig"
import { debounce } from "lodash"

const useNoteContent = (debounceDelay = 2000) => {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState({
    saving: false,
    savedStatus: null,
    error: null,
  })
  const [error, setError] = useState(null)

  const isInitialLoad = useRef(true) // Track if the content is just loaded

  const fetchNoteContent = async (librarySlug, noteSlug) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.get(
        `/library/${librarySlug}/note/${noteSlug}`
      )
      const fetchedContent = JSON.parse(response.data.data.content)
      setContent(fetchedContent) // Set fetched content
      isInitialLoad.current = true // Mark as initial load
      console.log("TEST: ", fetchNoteContent)
    } catch (error) {
      console.log("ERROR", error)

      setError(error.response?.data?.message || "Failed to get the note.")
    } finally {
      setLoading(false)
    }
  }

  // Debounced save function
  const saveNoteContent = useCallback(
    debounce(async (noteContent, librarySlug, noteSlug) => {
      try {
        const response = await axiosInstance.patch(
          `/library/${librarySlug}/note/${noteSlug}`,
          { content: noteContent }
        )

        setSaveStatus((prev) => ({
          ...prev,
          savedStatus: "success",
          saving: false,
          error: null,
        }))
      } catch (error) {
        setSaveStatus((prev) => ({
          ...prev,
          savedStatus: "failed",
          saving: false,
          error: error.response?.data?.message || "Failed to save note.",
        }))
      }
    }, debounceDelay),
    [debounceDelay]
  )

  // Handle content changes with auto-save
  const handleContentChange = (newContent, librarySlug, noteSlug) => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false // Skip saving on the first load
      return
    }

    const noteContent = JSON.stringify(newContent)

    setIsSaving(true) // Indicate saving is in progress
    setError(null) // Reset error state

    setSaveStatus((prev) => ({
      ...prev,
      saving: true,
      savedStatus: null,
      error: null,
    }))

    saveNoteContent(noteContent, librarySlug, noteSlug) // Trigger auto-save
  }

  // Cleanup the debounced function when the component unmounts
  useEffect(() => {
    return () => saveNoteContent.cancel()
  }, [saveNoteContent])

  return {
    content,
    isSaving,
    saveStatus,
    loading,
    error,
    fetchNoteContent,
    handleContentChange, // Use this for real-time updates
  }
}

export { useNoteContent }
