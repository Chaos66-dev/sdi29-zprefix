import './ItemActions.css'
import { useState, useContext } from 'react'
import CreateItem from '../CreateItem/CreateItem.jsx'
import InventoryContext from '../../Context/InventoryContext.jsx'

function ItemActions() {
    const [action, setAction] = useState('')
    const { currUser } = useContext(InventoryContext)

    return (
        <div className="item-actions-wrapper">
            <div className="create-item">
                <button type="button" onClick={() => {
                    if (currUser.id == 0) {
                        return alert('Please sign in to perform this function')
                    }
                    setAction('create')
                }}>Create Item</button>
            </div>

            {
                action == '' ? (
                    <></>
                ) : action == 'create' ? (
                    <CreateItem setAction={setAction}/>
                ) : <></>
            }
        </div>
    )
}

export default ItemActions