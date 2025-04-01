import { createContext, useState } from 'react'

const InventoryContext = createContext()

export const InventoryContextProvider = ({children}) => {
    const [currUser, setCurrUser] = useState({id: 1, Username: 'visitor'})
    const [items, setItems] = useState([])
    const [currItem, setCurrItem] = useState({})
    const [view, setView] = useState('all')

    return (
        <InventoryContext.Provider value={{ currUser, setCurrUser,
                                            items, setItems,
                                            currItem, setCurrItem,
                                            view, setView}}>
            { children }
        </InventoryContext.Provider>
    )
}

export default InventoryContext