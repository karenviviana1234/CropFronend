import React, { createContext } from 'react'
import { LotesProvider } from './LotesContext'
import { ActividadesProvider } from './ActividadContext'
import { CostosProvider } from './CostosContext'
import { CultivosProvider } from './CultivosContext'
import { FincasProvider } from './FincaContext'
import { ProgramacionesProvider } from './ProgramacionesContext'
import { TipoRecursosProvider } from './TipoRContext'
import { VariedadesProvider } from './VariedadContext'
import { UsuarioProvider } from './UsuariosContext'
import { ProduccionProvider } from './ProduccionContext'
import { PaswordProvider } from './PasswordContext'
// import { AuthProvider } from './authContext.jsx'


export const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

    const globalContextValue = {}

    return (
        <GlobalContext.Provider value={globalContextValue}>
            {/*  <AuthProvider> */}
            <ProduccionProvider>
            <VariedadesProvider>
                <TipoRecursosProvider>
                    <ProgramacionesProvider>
                        <LotesProvider>
                            <FincasProvider>
                                <CultivosProvider>
                                    <CostosProvider>
                                        <ActividadesProvider>
                                            <LotesProvider>
                                                <PaswordProvider>
                                                <UsuarioProvider>

                                                {children}
                                                </UsuarioProvider>
                                                </PaswordProvider>
                                            </LotesProvider>
                                        </ActividadesProvider>
                                    </CostosProvider>
                                </CultivosProvider>
                            </FincasProvider>
                        </LotesProvider>
                    </ProgramacionesProvider>
                </TipoRecursosProvider>
            </VariedadesProvider>
            </ProduccionProvider>
            {/* </AuthProvider> */}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
