import React, { ReactElement } from 'react'

const Layout = ({ children }: { children: ReactElement}) => {
  return (
    <main>
        {children}
    </main>
  )
}

export default Layout