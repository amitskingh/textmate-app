export default function LoadingSmall({ backgroundColor, borderColor }) {
  return (
    <>
      <div className={`flex items-center justify-center ${backgroundColor}`}>
        <div
          className={`border-t-2 border-l-2 ${borderColor} border-solid rounded-full size-5 animate-spin`}
        ></div>
      </div>
    </>
  )
}
