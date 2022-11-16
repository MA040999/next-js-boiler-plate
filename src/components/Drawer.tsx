import React, { useState } from 'react'
import { Sidebar } from 'primereact/sidebar';

interface IDrawerProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Drawer = ({isOpen, setIsOpen} : IDrawerProps) => {

    return (
        <Sidebar visible={isOpen} onHide={() => setIsOpen(false)}>
            <h3>Left Sidebar</h3>
        </Sidebar>
    )
}

export default Drawer