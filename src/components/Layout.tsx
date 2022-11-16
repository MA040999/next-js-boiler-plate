import React, { ReactElement, useState } from 'react'
import Drawer from './Drawer'
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactElement}) => {
    
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Navbar setIsOpen={setIsOpen} />
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout