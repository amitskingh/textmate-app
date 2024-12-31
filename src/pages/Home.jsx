import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/16/solid"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className=" xl:flex-row xl:justify-between lg:gap-0 flex flex-col gap-10">
      <div className="lg:m-7 md:m-6 sm:m-5 m-4">
        {/* Main Heading */}
        <h1 className="animate-typing lg:text-6xl md:text-5xl md:my-3 my-2 text-3xl font-extrabold bg-gradient-to-r from-rose-500 from-20% via-blue-600 via-50% to-orange-500 bg-clip-text text-transparent drop-shadow-md">
          Welcome to <span className="italic">TextMate</span>
        </h1>

        {/* Subheading */}
        <h3 className="lg:text-4xl md:text-3xl md:my-3 sm:text-2xl uppercase my-2 text-xl text-slate-700 font-semibold tracking-wide">
          Revolutionize your note-taking.
        </h3>

        {/* Description */}
        <h2 className="text-pretty md:text-4xl md:mt-5 sm:text-3xl text-2xl text-slate-600 mt-4 leading-relaxed">
          TextMate helps you{" "}
          <span className="text-rose-500 font-bold">capture</span>,{" "}
          <span className="text-rose-500 font-bold">organize</span>, and{" "}
          <span className="text-rose-500 font-bold">access your ideas</span>{" "}
          effortlessly.
        </h2>

        {/* Features List */}
        <ul className="mb-4 mt-2 space-y-2">
          <h3 className="md:text-3xl md:mt-3 sm:text-2xl sm:mb-2 text-xl mt-1 mb-0.5 font-bold underline text-gray-800">
            Features
          </h3>
          <li className="flex items-center">
            <ViewfinderCircleIcon className="lg:w-8 lg:h-8 text-blue-500 mr-2 md:w-6 md:h-6 w-5 h-5" />
            <span className="lg:text-2xl md:text-xl font-medium">
              Capture what matters.
            </span>
          </li>
          <li className="flex items-center">
            <RectangleStackIcon className="lg:w-8 lg:h-8 text-blue-500 mr-2 md:w-6 md:h-6 w-5 h-5" />
            <span className="lg:text-2xl md:text-xl font-medium">
              Organize with ease.
            </span>
          </li>
          <li className="flex items-center">
            <PencilSquareIcon className="lg:w-8 lg:h-8 text-blue-500 mr-2 md:w-6 md:h-6 w-5 h-5" />
            <span className="lg:text-2xl md:text-xl font-medium">
              Access instantly.
            </span>
          </li>
          <li className="flex items-center">
            <MagnifyingGlassIcon className="lg:w-8 lg:h-8 text-blue-500 mr-2 md:w-6 md:h-6 w-5 h-5" />
            <span className="lg:text-2xl md:text-xl font-medium">
              Search Notes.
            </span>
          </li>
        </ul>

        {/* Call-to-Action */}
        <h2 className="text-pretty lg:text-4xl text-gray-700 md:text-3xl md:my-5 text-2xl my-2 mb-4 leading-snug">
          Get started today and transform the way you take notes!
        </h2>
        <div className="flex gap-2">
          <button className="md:px-4 md:text-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-2 px-4 rounded shadow-md transform transition-transform duration-200 hover:scale-105">
            <Link to="/library" className="block">
              Get Started
            </Link>
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:h-screen lg:py-8">
        <img
          className="xl:rounded-lg w-full md:h-full shadow-lg transform hover:scale-95 transition-transform duration-300"
          src="Notes.jpeg"
          alt="Notes illustration"
        />
      </div>
    </div>
  )
}

export default Home
