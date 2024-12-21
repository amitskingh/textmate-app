import { BsJournalRichtext } from "react-icons/bs"

import React from "react"
import FileContent from "./FileContent"

import LoadingLarge from "./LoadingLarge"

const DATE_FORMAT = { day: "2-digit", month: "short", year: "numeric" } // Custom format

export default function LibraryList({ libraries, handleActionInfo, loading }) {
  if (loading) {
    return <LoadingLarge />
  }

  if (!libraries.length) {
    return (
      <p className="text-center text-gray-500">
        No libraries found, create one.
      </p>
    )
  }

  return (
    <div>
      {libraries.map((lib) => (
        <FileContent
          key={lib._id}
          FileSlug={lib.librarySlug}
          Icon={BsJournalRichtext}
          FileName={lib.libraryName}
          DateCreated={new Date(lib.createdAt).toLocaleDateString(
            "en-US",
            DATE_FORMAT
          )}
          TotalItems={lib.fileCount}
          handleActionInfo={handleActionInfo}
        />
      ))}
    </div>
  )
}
