import React from 'react'

function Spinner() {
  return (
    <div className="flex items-center justify-center">
        <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] role-status"
            role="status"
        >
            <span className="sr-only">Loading...</span>
        </div>
    </div>
  )
}

export default Spinner;