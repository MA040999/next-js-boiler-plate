import React from 'react'
import { Sidebar } from 'primereact/sidebar';
import { useBoundStore } from '../store';
import { Card } from 'primereact/card';

interface IDrawerProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminHistoryDrawer = ({isOpen, setIsOpen} : IDrawerProps) => {

    const history = useBoundStore(state => state.history)

    return (
        <Sidebar visible={isOpen} position={'right'} onHide={() => setIsOpen(false)}>
            <h3>Admin Action History</h3>
            <div className='mt-3 flex gap-4 flex-col'>
                {
                    history.map((h, id) => (
                        <Card key={id} className="shadow-md drop-shadow-md">
                            <div className='flex gap-3 flex-col'>
                                <span><strong>Admin Name:</strong> {h.name}</span>
                                <span><strong>Action:</strong> {h.action}</span>
                                <span><strong>Action Taken At:</strong> {new Date(h.createdAt).toLocaleString(undefined, {
                                    dateStyle: 'medium',
                                    timeStyle: "medium"
                                })}</span>
                            </div>
                        </Card>
                    ))
                }
            </div>
        </Sidebar>
    )
}

export default AdminHistoryDrawer