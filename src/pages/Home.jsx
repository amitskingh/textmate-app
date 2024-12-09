import { Link } from "react-router-dom"
import {
  ViewfinderCircleIcon,
  RectangleStackIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid"

function Home() {
  return (
    <div className="lg:flex-row lg:justify-between lg:gap-0 flex flex-col gap-10">
      <div className="lg:m-7 md:m-6 sm:m-5 m-4 ">
        <h1 className="lg:text-6xl md:text-5xl md:my-3  my-2 text-3xl font-bold">
          Welcome to TextMate
        </h1>
        <h3 className="lg:text-4xl md:text-3xl md:my-3 sm:text-2xl uppercase my-2 text-xl text-slate-600 border-b-2 border-slate-400">
          Revolutionize your note-taking.
        </h3>

        <h2 className="md:text-4xl md:mt-5 sm:text-3xl text-2xl text-slate-600 mt-4">
          TextMate helps you capture, organize, and access your ideas
          effortlessly.
        </h2>
        <ul className="mb-4 mt-1">
          <h3 className="md:text-3xl md:mt-2 sm:text-2xl sm:mb-1 text-xl mt-1 mb-0.5">
            Features
          </h3>
          <li>
            <ViewfinderCircleIcon className="lg:size-8 lg:mr-2 md:size-6 size-4 inline-block mr-1" />
            <span className="lg:text-2xl md:text-xl font-semibold">
              Capture what matters.
            </span>
          </li>
          <li>
            <RectangleStackIcon className="lg:size-8 lg:mr-2 md:size-6 size-4 inline-block mr-1" />
            <span className="lg:text-2xl md:text-xl font-semibold">
              Organize with ease.
            </span>
          </li>
          <li>
            <PencilSquareIcon className="lg:size-8 lg:mr-2 md:size-6 size-4 inline-block mr-1" />
            <span className="lg:text-2xl md:text-xl font-semibold">
              Access instantly.
            </span>
          </li>
          <li>
            <MagnifyingGlassIcon className="lg:size-8 lg:mr-2 md:size-6 size-4 inline-block mr-1" />
            <span className="lg:text-2xl md:text-xl font-semibold">
              Search Notes.
            </span>
          </li>
        </ul>
        <h2 className="lg:text-4xl md:text-3xl md:my-5 md:mb-4 text-2xl my-2 mb-3">
          Get started today and transform the way you take notes!
        </h2>
        <div className="flex">
          <button className="md:px-4 md:text-xl bg-zinc-950 hover:bg-zinc-800 text-white px-2 py-1 rounded mr-2 shadow">
            <Link to="/register">Sign Up</Link>
          </button>
          <button className="md:px-4 md:text-xl ring-1 ring-black hover:bg-black hover:text-white py-1 px-2 text-slate-800 rounded">
            <Link to="/login">Get Started</Link>
          </button>
        </div>
      </div>
      <div className="lg:h-screen lg:py-8 lg:-z-10">
        <img className="lg:bg-cover w-full md:h-full" src="notes.jpeg" alt="" />
      </div>
    </div>
  )
}

export default Home
