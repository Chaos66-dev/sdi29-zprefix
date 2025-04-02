import './ItemActions.css'
import { useState } from 'react'
import CreateItem from '../CreateItem/CreateItem.jsx'

function ItemActions() {
    const [action, setAction] = useState('')

    return (
        <div className="item-actions-wrapper">
            <div className="create-item">
                <button type="button" onClick={() => setAction('create')}>Create Item</button>
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