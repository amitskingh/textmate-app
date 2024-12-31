import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoadingSmall from "../component/LoadingSmall"
import { registerThunk } from "../features/auth/authThunk"

export default function Registration() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const emailRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef()

  const handleRegister = async (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const res = await dispatch(registerThunk({ name, email, password }))
    if (res.type === "auth/register/fulfilled") {
      navigate("/library")
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="Textmate.png"
            alt="Textmate Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="register-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  ref={nameRef}
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={emailRef}
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  ref={passwordRef}
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                {loading ? <LoadingSmall /> : "Sign Up"}
              </button>
            </div>
          </form>

          {error && (
            <div className="flex justify-center mt-2 text-red-600">{error}</div>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login to account
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
