import { FunnelIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { IoRefreshSharp } from "react-icons/io5"



export default function Filter() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={handleClick}
          className="p-2 px-2 border-collapse mb-3 shadow text-gray-700 bg-white ring-1 ring-gray-300 rounded-full hover:bg-gray-0"
          aria-label="Filter Libraries"
        >
          <FunnelIcon className="size-5 mr-1 inline-block" /> Filters
        </button>

        <div
          className={`p-4 absolute w-64 h-50 rounded z-10 bg-white shadow ring-1 ring-gray-300 transition-all duration-200 ease-in-out transform ${
            isMenuOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <form>
            <div className="font-semibold text-gray-800">Name</div>
            <div className="flex gap-5">
              <label className="my-2 font-semibold text-gray-800">
                <input
                  className="size-3.5 accent-black"
                  type="radio"
                  name="name-option"
                  value="Ascending"
                ></input>{" "}
                Ascending
              </label>
              <label className="my-2 font-semibold text-gray-800">
                <input
                  className="size-3.5 accent-black"
                  type="radio"
                  name="name-option"
                  value="Descending"
                ></input>{" "}
                Descending
              </label>
            </div>
            <div className="mt-3 font-semibold text-gray-800">Date</div>
            <div className="flex gap-5">
              <label className="my-2 font-semibold text-gray-800">
                <input
                  className="size-3.5 accent-black"
                  type="radio"
                  name="date-option"
                  value="Created"
                ></input>{" "}
                Created
              </label>
              <label className="my-2 font-semibold text-gray-800">
                <input
                  className="size-3.5 accent-black"
                  type="radio"
                  name="date-option"
                  value="Created"
                ></input>{" "}
                Modified
              </label>
            </div>

            <button
              type="reset"
              className="w-full mt-4 flex items-center justify-center py-1.5 rounded bg-white ring-1 ring-gray-200 text-gray-800 hover:bg-gray-50 font-semibold"
            >
              <IoRefreshSharp className="size-5 rotate-180 transform -scale-y-100 mr-1" />{" "}
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

/*


useEffect(() => {
    const getNote = async () => {
      try {
        const headers = getHeaders()
        const { bookId, noteId } = req
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/books/${bookId}/notes/${noteId}`,
          {
            withCredentials: true,
            headers: headers,
          }
        )

        noteTitleElement.current.value = response.data.title
        quillRef.current.setContents(JSON.parse(response.data.content))
        // quillRef.current.setContents(response.data.content)
      } catch (error) {
        // console.log(error)

        if (error.response.status === 401) {
          navigate("/login")
        } else if (error.response.status === 404) {
          navigate("/not-found")
        } else {
          // bad-request
          navigate("/")
        }
      }
    }
    getNote()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const title = noteTitleElement.current.value
    const content = JSON.stringify(quillRef.current.getContents())

    try {
      const headers = getHeaders()
      const { bookId, noteId } = req
      const response = await axios.patch(
        `${BACKEND_URL}/api/v1/books/${bookId}/notes/${noteId}`,
        { title: title, content: content },
        {
          withCredentials: true,
          headers: headers,
        }
      )

      warningRef.current.innerText = ""

      // noteTitleElement.current.value = response.data.title
    } catch (error) {
      if (error.response.status === 400) {
        warningRef.current.innerText = "Please Provide the title"
      } else if (error.response.status === 401) {
        navigate("/login")
      } else if (error.response.status === 404) {
        navigate("/not-found")
      }
    }
  }


*/
