export default function ErrorMessage({ error }) {

  return (
    <>
      <center className="mt-2 flex items-center justify-center">
        <p className="p-4 text-red-600">{error}</p>
      </center>
    </>
  )
}
