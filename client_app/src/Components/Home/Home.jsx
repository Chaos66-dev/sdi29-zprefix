import './Home.css'
import { useContext, useEffect } from 'react'
import InventoryContext from '../../Context/InventoryContext.jsx'
import ItemCard from '../ItemCard/ItemCard.jsx'
import ItemActions from '../ItemActions/ItemActions.jsx'

function Home() {
    const { items, setItems, view, currUser } = useContext(InventoryContext)

    useEffect(() => {
        fetch(`http://localhost:4000/items`)
            .then(res => res.json())
            .then(data => setItems(data))
    }, [ view ])

    return (
        <div>
            {view == 'all' ? (
                <div className="home-wrapper">
                    {items.map((item, idx) => {
                        return <ItemCard key={idx} item={item} />
                    })}
                </div>

            ) : view == 'user' ? (
                <div className="my-items-container">
                    <div className="item-actions">
                        <ItemActions />
                    </div>
                    <div className="my-items-card-container">
                        {items.filter((item) => item.UserId == currUser.id).map((item, idx) => {
                            return <ItemCard key={idx} item={item} />
                        })}
                    </div>
                </div>
            ) : (
                <div>
                    no items
                </div>
            )}
        </div>
    )
}

export default Home