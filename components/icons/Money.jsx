import * as React from "react"

function Money(props) {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 20.833A5.833 5.833 0 1020 32.5a5.833 5.833 0 000-11.667zm-2.5 5.834a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
        fill="currentColor"
      />
      <path
        d="M29.21 8.527l-5.298-7.429L4.43 16.662l-1.08-.012v.017H2.5v20h35v-20h-1.603l-3.19-9.332-3.497 1.192zm3.165 8.14H15.662l12.448-4.244 2.537-.811 1.728 5.055zM25.917 9.65l-12.85 4.38L23.243 5.9l2.674 3.75zM5.833 30.282v-7.234A5 5 0 008.883 20h22.234a5 5 0 003.05 3.05v7.233a4.999 4.999 0 00-3.05 3.05H8.887a5.017 5.017 0 00-3.054-3.051z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Money
