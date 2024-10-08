import * as React from "react"

function TaskComplete(props) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22 27.18l-2.59-2.59L18 26l4 4 8-8-1.41-1.41L22 27.18z"
        fill="currentColor"
      />
      <path
        d="M25 5h-3V4a2.006 2.006 0 00-2-2h-8a2.006 2.006 0 00-2 2v1H7a2.006 2.006 0 00-2 2v21a2.006 2.006 0 002 2h9v-2H7V7h3v3h12V7h3v11h2V7a2.006 2.006 0 00-2-2zm-5 3h-8V4h8v4z"
        fill="currentColor"
      />
    </svg>
  )
}

export default TaskComplete
