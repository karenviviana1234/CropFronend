import React, { createContext } from 'react'
// import { AuthProvider } from './authContext.jsx'


export const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

    const globalContextValue = {}

    return (
        <GlobalContext.Provider value={globalContextValue}>
            {/*  <AuthProvider> */}
                {/* <LotesProvider> */}

                    {children}

                {/* </LotesProvider>  */}
            {/* </AuthProvider> */}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
