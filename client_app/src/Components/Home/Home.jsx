import './Home.css'
import { useContext } from 'react'
import InventoryContext from '../../Context/InventoryContext.jsx'
import ItemCard from '../ItemCard/ItemCard.jsx'

function Home() {
    const { items, view, currUser } = useContext(InventoryContext)
    // TODO filter results to only disply user items if view is not all

    return (
        <div className="home-wrapper">
            {view == 'all' ? (
                items.map((item, idx) => {
                    return <ItemCard key={idx} item={item} />
                }))
            : view == 'user' ? (
                items.filter((item) => item.UserId == currUser.id).map((item, idx) => {
                    return <ItemCard key={idx} item={item} />
                }))
            : (
                <div>
                    no items
                </div>
            )}
        </div>
    )
}

export default Home