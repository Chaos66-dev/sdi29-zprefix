import './ItemCard.css'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import InventoryContext from '../../Context/InventoryContext.jsx'

function ItemCard({ item }) {
    const navigate = useNavigate()
    const { setCurrItem } = useContext(InventoryContext)
    const [ description, setDescription ] = useState('')

    function handleItemCardClick(item) {
        setCurrItem(item)
        navigate('/details')
    }

    useEffect(() => {
        if (item.Description.length > 100) {
            setDescription(item.Description.slice(0, 100) + "...")
        } else {
            setDescription(item.Description)
        }
    }, [])

    return (
        <div className='item-card-wrapper' onClick={() => handleItemCardClick(item)}>
            <div className="item-id-name">
                <div>
                    {item.id}.
                </div>
                <div>
                    {item.ItemName}
                </div>

            </div>
            <div className="item-description">
                {description}
            </div>
            <div className="item-quantity">
                Quantity: {item.Quantity}
            </div>
            <div className="item-user">
                Associated User: {item.UserId}
            </div>
        </div>
    )
}

export default ItemCard