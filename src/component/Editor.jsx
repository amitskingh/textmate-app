import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react"

import Quill from "quill"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"
import "quill/dist/quill.bubble.css" // Import the Bubble theme CSS

window.hljs = hljs

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null)
    const onTextChangeRef = useRef(onTextChange)
    const onSelectionChangeRef = useRef(onSelectionChange)

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange
      onSelectionChangeRef.current = onSelectionChange
    })

    useEffect(() => {
      ref.current?.enable(!readOnly)
    }, [ref, readOnly])

    useEffect(() => {
      const container = containerRef.current
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      )

      const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote"],
        ["link"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ direction: "rtl" }], // text direction

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ align: [] }],
        ["code-block"],
        ["clean"], // remove formatting button
      ]

      const quill = new Quill(editorContainer, {
        modules: {
          toolbar: toolbarOptions,
          syntax: {
            hljs,
          },
        },
        theme: "snow",
        placeholder: "Get started typing...",
      })

      ref.current = quill

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args)
      })

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args)
      })

      return () => {
        ref.current = null
        container.innerHTML = ""
      }
    }, [ref])

    return <div ref={containerRef}></div>
  }
)

Editor.displayName = "Editor"

export default Editor
