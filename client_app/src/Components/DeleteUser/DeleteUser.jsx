import './DeleteUser.css'
import { useState } from 'react'

function DeleteUser({setAction}) {
    const [uid, setUid] = useState('')

    function handleEditUser() {
        fetch('http://localhost:4000/users', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UserId: uid
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.error)
                }
                return res.json()
            })
            .then(data => {
                alert('User successfully deleted')
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
            <div className="submit">
                <button type="submit" onClick={handleEditUser}>Edit</button>
            </div>
        </div>
    )
}

export default DeleteUser