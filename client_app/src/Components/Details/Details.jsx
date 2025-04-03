import './Details.css'
import { useContext, useState } from 'react'
import InventoryContext from '../../Context/InventoryContext.jsx'
import { useNavigate } from 'react-router-dom'

function Details() {
    const { currItem, setView, setItems, currUser } = useContext(InventoryContext)
    const [ description, setDescription ] = useState(currItem.Description)
    const [ edit, setEdit ] = useState(false)
    const [ itmnm, setItmnm ] = useState(currItem.ItemName)
    const [ qntty, setQntty ] = useState(currItem.Quantity)
    const [ uid, setUid ] = useState(currItem.UserId)
    const navigate = useNavigate()

    function handleEditClick() {
        if (currUser.id == 0) {
            return alert('Please sign in to perform this function')
        }
        if (edit == false) {
            setEdit(true)
        } else {
            setEdit(false)
            fetch('http://localhost:4000/items', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: currItem.id,
                    UserId: uid,
                    ItemName: itmnm,
                    Description: description,
                    Quantity: qntty
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Error sending updates to backend database')
                    }
                })
                .catch(error => alert(error))
        }
    }

    function handleDeleteClick() {
        if (currUser.id == 0) {
            return alert('Please sign in to perform this function')
        }
        fetch('http://localhost:4000/items', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: currItem.id
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error deleting this item')
                }
                return res.json()
            })
            .then(data => {
                setView('user')
                setItems(data)
                navigate('/')
            })
            .catch(error => alert(error))
    }

    return (
        <div className="details-wrapper">
            <div className="id">
                Item ID: {currItem.id}
            </div>
            <div className="name">
                {edit ?
                    <input type="text"
                            name="itemname"
                            id="itemname"
                            placeholder='Item Name'
                            value={itmnm}
                            onChange={(event) => setItmnm(event.target.value)} />
                :
                    'Item Name: ' + itmnm
                }
            </div>
            <div className="description">
                {edit ?
                    <input type="text"
                            name="description"
                            id="description"
                            placeholder='Description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)} />
                :
                    'Item Description: ' + description
                }
            </div>
            <div className="quantity">
                {edit ?
                    <input type="number"
                            name="quantity"
                            id="quantity"
                            placeholder='Quantity'
                            value={qntty}
                            onChange={(event) => setQntty(event.target.value)} />
                :
                    'Item Quantity: ' + qntty
                }
            </div>
            <div className="user">
                {edit ?
                    <input type="number"
                            name="userid"
                            id="userid"
                            placeholder='User Id'
                            value={uid}
                            onChange={(event) => setUid(event.target.value)} />
                :
                    'User ID who added this item: ' + uid
                }
            </div>
            <div className="actions">
                <button type="button" onClick={handleEditClick}>
                    {!edit ?
                        'Edit'
                    :
                       'Submit'
                    }
                </button>
                <button type="button" onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    )
}

export default Details