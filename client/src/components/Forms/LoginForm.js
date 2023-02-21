import React, { useRef, useEffect, useState, useContext } from 'react';
// import './LoginForm.css'

export default function LoginForm() {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pass])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(user, pass)
        setUser('')
        setPass('')
        setSuccess(true)
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                    <input
                        type="text"
                        id = "username"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                <label htmlFor='password'>Password:</label>
                    <input
                        type="password"
                        id = "password"
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        required
                    />
                    <button>Login</button>
            </form>
        </section>  
    )
}