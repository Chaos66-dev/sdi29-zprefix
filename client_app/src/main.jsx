import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Components/App/App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { InventoryContextProvider } from './Context/InventoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <InventoryContextProvider>
      <App />
    </InventoryContextProvider>
  </Router>
)
