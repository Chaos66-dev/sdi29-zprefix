import './CreateItem.css'
import { useState } from 'react'

function CreateItem({setAction}) {
    const [userId, setUserId] = useState('')
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')

    function handleCreateItem() {
        fetch('http://localhost:4000/items', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UserId: userId,
                ItemName: itemName,
                Description: description,
                Quantity: quantity
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.error)
                }
                return res.json()
            })
            .then(data => {
                alert('Item successfully added')
                setAction('')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="item-wrapper">
            <div className="item-actions-1">
                <input type="text"
                        name="userId"
                        id="userId"
                        placeholder="User Id"
                        value={userId}
                        onChange={(event) => setUserId(event.target.value)}/>
                <input type="text"
                        name="itemname"
                        id="itemname"
                        placeholder="Item Name"
                        value={itemName}
                        onChange={(event) => setItemName(event.target.value)}/>
            </div>
            <div className="item-actions-2">
                <input type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}/>
                <input type="text"
                        name="quantity"
                        id="quantity"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)} />
            </div>
            <div className="submit">
                <button type="submit" onClick={handleCreateItem}>Create</button>
            </div>
        </div>
    )
}

export default CreateItem