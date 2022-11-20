import React, { ReactElement, useState } from 'react'
import AdminHistoryDrawer from './AdminHistoryDrawer';
import Drawer from './Drawer'
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactElement}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);

    return (
        <>
            <Navbar setIsOpen={setIsOpen} setIsHistoryDrawerOpen={setIsHistoryDrawerOpen} />
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
            <AdminHistoryDrawer isOpen={isHistoryDrawerOpen} setIsOpen={setIsHistoryDrawerOpen} />
            {children}
        </>
    )
}

export default Layout