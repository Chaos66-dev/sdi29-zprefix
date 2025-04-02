import { useEffect, useContext } from 'react'
import InventoryContext from '../../Context/InventoryContext.jsx'
import './App.css'
import Nav from '../Nav/Nav.jsx'
import Login from '../Login/Login.jsx'
import Home from '../Home/Home.jsx'
import Details from '../Details/Details.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  const { currUser } = useContext(InventoryContext)
  const { setItems } = useContext(InventoryContext)


  useEffect(() => {
    fetch(`http://localhost:4000/items/${currUser.id}`)
      .then(res => res.json())
      .then(data => {
        setItems(data)
      })
  }, [])

  return (
    <div className="app-wrapper">
      <Nav />
      <div className="signed-in">
        You are currently signed in as {currUser.Username} with an id of {currUser.id}
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/details' element={<Details />} />
      </Routes>
    </div>
  )
}

export default App
