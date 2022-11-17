import React from 'react'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

interface INavbarProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({setIsOpen} : INavbarProps) => {
  return (
    <Menubar
        start={<Button icon="pi pi-bars" onClick={() => setIsOpen(true)} />}
    />
  )
}

export default Navbar