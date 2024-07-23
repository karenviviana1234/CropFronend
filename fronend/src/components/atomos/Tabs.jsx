import React from 'react'

function Tabs({ children, className, ...props }) {
    return (
        <div className={`ml-4 h-8 w-20 rounded-lg text-black bg-white hover:bg-green roun ${className}`} {...props}>
  {children}
</div>

    )
}

export default Tabs
