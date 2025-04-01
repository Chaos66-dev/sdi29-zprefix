import './Nav.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import InventoryContext from '../../Context/InventoryContext.jsx'

function Nav() {
    const navigate = useNavigate()
    const { setView } = useContext(InventoryContext)

    return (
        <div className="nav-wrapper">
            <div className="home" onClick={() => {
                                                    setView('all')
                                                    navigate('/')
                                                }}>
                Home
            </div>
            <div className="my-items" onClick={() => {
                                                        setView('user')
                                                        navigate('/')
                                                    }}>
                My Items
            </div>
            <div className="login" onClick={() => navigate('/login')}>
                Login
            </div>
        </div>
    )
}

export default Nav