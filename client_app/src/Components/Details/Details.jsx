import './Details.css'
import { useContext } from 'react'
import InventoryContext from '../../Context/InventoryContext.jsx'

function Details() {
    const { currItem } = useContext(InventoryContext)

    return (
        <div className="details-wrapper">
            <div className="id">
                Item ID: {currItem.id}
            </div>
            <div className="name">
                Item Name: {currItem.ItemName}
            </div>
            <div className="description">
                Item Description: {currItem.Description}
            </div>
            <div className="quantity">
                Item Quanity: {currItem.Quantity}
            </div>
            <div className="user">
                User ID who added this item: {currItem.UserId}
            </div>
        </div>
    )
}

export default Details