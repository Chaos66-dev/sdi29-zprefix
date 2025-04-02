import './CreateUser.css'
import { useState } from 'react'

function CreateUser({ setAction }) {
    const [fn, setFn] = useState('')
    const [ln, setLn] = useState('')
    const [un, setUn] = useState('')
    const [pw, setPw] = useState('')

    function handleCreateUser() {
        fetch('http://localhost:4000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                FirstName: fn,
                LastName: ln,
                Username: un,
                Password: pw
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.error)
                }
                return res.json()
            })
            .then(data => {
                alert('User successfully added')
                setAction('')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="create-wrapper">
            <div className="name">
                <input type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="First Name"
                        value={fn}
                        onChange={(event) => setFn(event.target.value)}/>
                <input type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Last Name"
                        value={ln}
                        onChange={(event) => setLn(event.target.value)}/>
            </div>
            <div className="login-info">
                <input type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={un}
                        onChange={(event) => setUn(event.target.value)}/>
                <input type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={pw}
                        onChange={(event) => setPw(event.target.value)} />
            </div>
            <div className="submit">
                <button type="submit" onClick={handleCreateUser}>Create</button>
            </div>
        </div>
    )
}

export default CreateUser