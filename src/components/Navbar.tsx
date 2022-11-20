import React from 'react'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

interface INavbarProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsHistoryDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({setIsOpen, setIsHistoryDrawerOpen} : INavbarProps) => {
  return (
    <Menubar
        start={<Button icon="pi pi-bars" onClick={() => setIsOpen(true)} />}
        end={<Button label='Admin History'  onClick={() => setIsHistoryDrawerOpen(true)} />}
    />
  )
}

export default Navbar