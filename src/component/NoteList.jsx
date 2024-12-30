import { CiStickyNote } from "react-icons/ci"

import React from "react"
import FileContent from "./FileContent"

import LoadingLarge from "./LoadingLarge"

const DATE_FORMAT = { day: "2-digit", month: "short", year: "numeric" } // Custom format

export default function NoteList({ notes, handleActionInfo, loading }) {
  if (loading) {
    return <LoadingLarge />
  }

  if (!notes.length && !loading) {
    return (
      <p className="text-center text-gray-500">No notes found, create one.</p>
    )
  }

  return (
    <div>
      {notes.map((note) => (
        <FileContent
          key={note._id}
          FileSlug={note.noteSlug}
          Icon={CiStickyNote}
          FileName={note.noteName}
          DateCreated={new Date(note.createdAt).toLocaleDateString(
            "en-US",
            DATE_FORMAT
          )}
          TotalItems={note.fileCount}
          handleActionInfo={handleActionInfo}
          isLibrary={false}
        />
      ))}
    </div>
  )
}
