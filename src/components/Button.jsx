import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <button
    className={`px-4 py-2 ${bgColor} ${textColor} ${className} rounded-md shadow-md transition duration-300 ease-in-out`}
    type={type}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button