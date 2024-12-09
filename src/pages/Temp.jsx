import { useState } from "react"

export default function Modal() {
  const [isActive, setIsActive] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  const handleDismiss = () => {
    setIsExiting(true) // Trigger exit animation
    setTimeout(() => setIsActive(false), 300) // Delay unmounting for animation to complete
  }

  if (!isActive) return null

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleDismiss} // Dismiss when clicking the overlay
    >
      {/* Modal Content */}
      <div
        className={`flex flex-col rounded py-6 px-8 z-50 bg-white sm:w-96 shadow-xl transform transition-all duration-300 ease-in-out ${
          isExiting
            ? "scale-95 translate-y-4 opacity-0"
            : "scale-100 translate-y-0 opacity-100"
        }`}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()} // Prevent dismissing on content click
      >
        <p
          id="modal-title"
          className="sm:text-2xl text-gray-700 text-xl mb-4 font-bold"
        >
          New Library
        </p>
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter library name"
            className="mt-2 mb-4 h-8 w-full focus:ring-1 focus:outline-none focus:border-sky-600 focus:ring-sky-600 rounded-sm ring-1 ring-sky-300"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={handleDismiss}
              className="bg-gray-600 py-1 px-3 rounded text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleDismiss}
              className="py-1 px-3 bg-green-600 text-green-100 rounded"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
