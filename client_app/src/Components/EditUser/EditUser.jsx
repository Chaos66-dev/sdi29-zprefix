import './EditUser.css'
import { useState } from 'react'


function EditUser({setAction}) {
    const [fn, setFn] = useState('')
    const [ln, setLn] = useState('')
    const [un, setUn] = useState('')
    const [pw, setPw] = useState('')
    const [uid, setUid] = useState('')

    function handleEditUser() {
        fetch('http://localhost:4000/users', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UserId: uid,
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
                alert('User successfully edited')
                setAction('')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="edit-wrapper">
            <div className="id">
            <input type="text"
                        name="userid"
                        id="userid"
                        placeholder="User ID"
                        value={uid}
                        onChange={(event) => setUid(event.target.value)}/>
            </div>
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
                <button type="submit" onClick={handleEditUser}>Edit</button>
            </div>
        </div>
    )
}

export default EditUser