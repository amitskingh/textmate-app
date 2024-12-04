export default function () {
  const handdleClick = () => {
    const q = document.querySelector('.red')
    q.className = "text-3xl font-bold"
  }

  return (
    <>
      <div className="h-96 w-96 ring-1 ring-indigo-600" contenteditable="true">
        <center className="red">Welcome</center>
        <div></div>
      </div>
      <button
        onClick={handdleClick}
        className="ring-1 ring-black py-2 bg-black px-5 rounded text-white"
      >
        Click
      </button>
    </>
  )
}
