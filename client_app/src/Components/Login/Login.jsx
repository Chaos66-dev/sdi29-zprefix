import './Login.css'
import { useContext, useState } from 'react'
import InventoryContext from '../../Context/InventoryContext.jsx'
import { useNavigate } from 'react-router-dom'
import CreateUser from '../CreateUser/CreateUser.jsx'
import EditUser from '../EditUser/EditUser.jsx'
import DeleteUser from '../DeleteUser/DeleteUser.jsx'

function Login() {
    const { currUser, setCurrUser, setView } = useContext(InventoryContext)
    const [usrnm, setUsrnm] = useState('')
    const [psswd, setPsswd] = useState('')
    const [action, setAction] = useState('')
    const navigate = useNavigate()

    function handleLogin() {
        fetch(`http://localhost:4000/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usrnm,
                password: psswd
            })
        })
            .then(res => {
                if(res.status != 200) {
                    throw new Error('Invalid Username or Password')
                }
                return res.json()
            })
            .then(data => {
                setCurrUser(data[0])
                setView('user')
                navigate('/')
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <div className="login-wrapper">
            <div className="welcome">
                Welcome to Inventory Manager 42!
            </div>
            <div className="curr-user">
                You are currently signed in as {currUser.Username}
            </div>
            <div className="form">
                <div className="username">
                    <input type="text"
                            name="usrnm"
                            id="username"
                            value={usrnm}
                            placeholder="Username"
                            onChange={(event) => setUsrnm(event.target.value)} />
                </div>
                <div className="password">
                    <input type="password"
                                name="psswd"
                                id="password"
                                value={psswd}
                                placeholder="Password"
                                onChange={(event) => setPsswd(event.target.value)} />
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
            </div>
            <div className="user-actions">
                <div className="create-user">
                    <button type="button" onClick={() => setAction('create')}>Create User</button>
                </div>
                <div className="edit-user">
                    <button type="button" onClick={() => setAction('edit')}>Edit User</button>
                </div>
                <div className="delete-user">
                    <button type="button" onClick={() => setAction('delete')}>Delete User</button>
                </div>
            </div>

            {
                action == '' ? (
                    <></>
                ) : action == 'create' ? (
                    <CreateUser setAction={setAction}/>
                ) : action == 'edit' ? (
                    <EditUser setAction={setAction}/>
                ) : action == 'delete' ? (
                    <DeleteUser setAction={setAction}/>
                ) : <></>
            }

        </div>
    )
}

export default Login