import { useRef, useState, useEffect } from "react"
import LoadingSmall from "./LoadingSmall"
import { validateFilename } from "../utils/validation"

export const ActionTypes = {
  NEW: "NEW",
  RENAME: "RENAME",
  DELETE: "DELETE",
}

export default function Modal({
  ModalInfo,
  handleAction,
  dismissAction,
  status,
}) {
  if (!ModalInfo?.action) {
    return null
  }

  const [isExiting, setIsExiting] = useState(false)
  const [warning, setWarning] = useState("")
  const [fileName, setFileName] = useState("")

  useEffect(() => {
    if (ModalInfo.action === ActionTypes.RENAME) {
      setFileName(ModalInfo.payload.fileName || "")
    }
  }, [ModalInfo])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => {
      dismissAction(ModalInfo.action)
    }, 300) // Match animation duration
  }

  const handleTriggerAction = async () => {
    const { action, payload } = ModalInfo
    let response

    if ([ActionTypes.NEW, ActionTypes.RENAME].includes(action)) {
      const result = validateFilename(fileName)
      if (result.validate) {
        payload.fileName = fileName
        response = await handleAction(action, payload)
      } else {
        setWarning(result.error)
      }
    } else if (action === ActionTypes.DELETE) {
      response = await handleAction(action, payload)
    }

    if (response?.error) {
      setWarning(response.error)
    } else {
      handleDismiss()
    }
  }

  const loading =
    status.add.loading || status.delete.loading || status.rename.loading

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`flex flex-col mx-4 rounded py-6 px-8 z-50 bg-white sm:w-96 shadow-xl transform transition-all duration-300 ease-in-out ${
          isExiting
            ? "scale-95 translate-y-4 opacity-0"
            : "scale-100 translate-y-0 opacity-100"
        }`}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          id="modal-title"
          className="sm:text-2xl text-gray-700 text-xl mb-4 font-bold"
        >
          {ModalInfo.heading}
        </p>

        <div className="w-full">
          {(ModalInfo.action === ActionTypes.NEW ||
            ModalInfo.action === ActionTypes.RENAME) && (
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder={ModalInfo.payload.placeholder || "Enter filename"}
              className="mt-2 mb-4 h-8 w-full focus:ring-1 focus:outline-none focus:border-sky-600 focus:ring-sky-600 rounded-sm ring-1 ring-sky-300"
            />
          )}

          {ModalInfo.action === ActionTypes.DELETE && (
            <p className="mb-4">
              <span className="text-red-500">{ModalInfo.payload.fileName}</span>{" "}
              will be deleted.
            </p>
          )}

          <div className="mb-2 pb-4">
            <p className="text-red-600 text-center">{warning}</p>
          </div>

          <div className="flex justify-start gap-3">
            <button
              onClick={handleDismiss}
              className="bg-gray-600 py-1 px-3 rounded text-white"
            >
              Cancel
            </button>
            {loading ? (
              <LoadingSmall
                backgroundColor={"bg-transparent"}
                borderColor={"border-green-700"}
              />
            ) : (
              <button
                onClick={handleTriggerAction}
                className="py-1 px-3 bg-green-600 text-green-100 rounded"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
