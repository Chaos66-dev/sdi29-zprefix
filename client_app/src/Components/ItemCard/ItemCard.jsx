import './ItemCard.css'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import InventoryContext from '../../Context/InventoryContext.jsx'

function ItemCard({ item }) {
    const navigate = useNavigate()
    const { setCurrItem, setView, setItems, currUser } = useContext(InventoryContext)
    const [ description, setDescription ] = useState('')
    const [ edit, setEdit ] = useState(false)
    const [ itmnm, setItmnm ] = useState(item.ItemName)
    const [ qntty, setQntty ] = useState(item.Quantity)
    const [ uid, setUid ] = useState(item.UserId)

    function handleItemCardClick(item) {
        if (!edit) {
            setCurrItem(item)
            navigate('/details')
        }
    }

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
                    id: item.id,
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
                id: item.id
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

    useEffect(() => {
        if (item.Description.length > 100) {
            setDescription(item.Description.slice(0, 100) + "...")
        } else {
            setDescription(item.Description)
        }
    }, [])

    return (
        <div className='item-card-wrapper'>
            <div className="clickable-wrapper" onClick={() => handleItemCardClick(item)}>
                <div className="item-id-name">
                    <div>
                        {item.id}
                    </div>
                    <div>
                        {edit ?
                            <input type="text"
                                    name="itemname"
                                    id="itemname"
                                    placeholder='Item Name'
                                    value={itmnm}
                                    onChange={(event) => setItmnm(event.target.value)} />
                        :
                            itmnm
                        }
                    </div>

                </div>
                <div className="item-description">
                    {edit ? (
                        <input type="text"
                                name="description"
                                id="description"
                                placeholder='Description'
                                value={description}
                                onChange={(event) => setDescription(event.target.value)} />
                    ) : description.length > 100 ? (
                            description.slice(0, 100) + "..."
                    )   :   (
                            description
                    )}
                </div>
                <div className="item-quantity">
                    {edit ?
                        <input type="number"
                                name="quantity"
                                id="quantity"
                                placeholder='Quantity'
                                value={qntty}
                                onChange={(event) => setQntty(event.target.value)} />
                    :
                        'Quantity: ' + qntty
                    }
                </div>
                <div className="item-user">
                    {edit ?
                        <input type="number"
                                name="uid"
                                id="uid"
                                placeholder='User Id'
                                value={uid}
                                onChange={(event) => setUid(event.target.value)} />
                    :
                        'Associated User Id: ' + uid
                    }
                </div>
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

export default ItemCard