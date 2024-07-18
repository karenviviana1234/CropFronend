import React from 'react'

function Tabs({ children, className, ...props }) {
    return (
        <div className={`ml-4 mt-8 h-8 w-24 bg-lime-700 hover:bg-green rounded-tl-lg rounded-tr-lg ${className}`} {...props}>
            {children}
        </div>
    )
}

export default Tabs
