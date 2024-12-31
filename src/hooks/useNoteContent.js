import { useState, useCallback, useEffect, useRef } from "react"
import axiosInstance from "../api/axiosConfig"
import { debounce } from "lodash"

const useNoteContent = (debounceDelay = 2000) => {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saveStatus, setSaveStatus] = useState("idle") // "idle" | "saving" | "success" | "error"

  const isInitialLoad = useRef(true)
  const fetchNoteContent = useCallback(async (librarySlug, noteSlug) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.get(
        `/library/${librarySlug}/note/${noteSlug}`
      )
      const fetchedContent = JSON.parse(response.data.data.content)
      setContent(fetchedContent)
      isInitialLoad.current = true // Mark initial load here
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to get the note.")
    } finally {
      setLoading(false)
    }
  }, []) // Empty dependency array as it doesn't depend on any state

  // Debounced save function
  const saveNoteContent = useCallback(
    debounce(async (noteContent, librarySlug, noteSlug) => {
      try {
        const response = await axiosInstance.patch(
          `/library/${librarySlug}/note/${noteSlug}`,
          { content: noteContent }
        )

        setSaveStatus("success")
      } catch (error) {
        console.error("Error saving note:", error)
        setSaveStatus("error")
      }
    }, debounceDelay),
    [debounceDelay]
  )

  const handleContentChange = useCallback(
    (newContent, librarySlug, noteSlug) => {
      if (isInitialLoad.current) {
        isInitialLoad.current = false
        return
      }

      const noteContent = JSON.stringify(newContent)

      if (noteContent === content) {
        return
      }

      setSaveStatus("saving")
      setContent(content)

      saveNoteContent(noteContent, librarySlug, noteSlug)
    },
    [saveNoteContent]
  )

  // Cleanup the debounced function when the component unmounts
  useEffect(() => {
    return () => saveNoteContent.cancel()
  }, [saveNoteContent])

  return {
    content,
    saveStatus,
    loading,
    error,
    fetchNoteContent,
    handleContentChange, // Use this for real-time updates
  }
}

export { useNoteContent }
