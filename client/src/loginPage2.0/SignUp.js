import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export const SignUpPage =()=>{
    const [username, setUserName] = useState('')
    const [validName,setValidName] =useState(false)
    const [userFocus, setUserFocus] = useState(false)
    
    const [password, setPassWord] = useState('')
    const [validPwd,setValidPwd] =useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    // const [matchPwd, setMatchPwd] = useState('')
    // const [validMatch, setValidMatch] = useState(false)
    // const [matchFocus,setMatchFocus] = useState (false)

    const [errmsg, setErrMsg] =useState('') 
    const [success, setSuccess] =useState(false)

    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();

    // set focus on user
    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        const result = USER_REGEX.test(username)
        console.log(result)
        console.log(username)
        setValidName(result)
    },[username])
    

    useEffect(()=>{
        const result = PWD_REGEX.test(password)
        console.log(result)
        console.log(password)
        setValidPwd(result)
        // const match = pwd ===matchPwd
        // setValidMatch(match)
    },[password])

    useEffect (()=>{
        setErrMsg('')
    },[username,password])
        // ,matchPwd])
    
    const handleSignUp = async (e)=>{
        // const v1 = USER_REGEX.test(user);
        // const v2 = PWD_REGEX.test(pwd);
        // if(!v1 || !v2) setErrMsg ("Invalid Entry")
         e.preventDefault()
         try{
            const reponse = await axios.post('api/register',{username,password})
            .then((response)=>{
                console.log(response)
                setUserName('')
                setPassWord('')
            if(response.data.message ==="user added"){
                setSuccess(false)
                navigate('/')
            }else setErrMsg("Username Exist")
            })
         }catch(e){
            console.log(e)
            
         }
    }

    return(
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label htmlFor="username">
                    Username:
                    
                    <input 
                        type='text' 
                        id="username" 
                        ref={userRef} 
                        autoComplete="off"
                        required 
                        value = {username} 
                        onChange={(e)=>{setUserName(e.target.value)}}
                        aria-invalid={validName?"false":"true"}
                        // aria-describebody ="uidnote"
                        onFocus={()=>setUserFocus(true)}
                        onBlur={()=>setUserFocus(false)}
                        />
                </label>
                {!validName?<p>4 to 24 characters.<br/>Must begin with a letter.<br/>Letters, numbers, underscores, hyphens allowed.</p>:<></>}
                <br/>
                <label htmlFor="password">
                    Password:
                    <input type="password" id="password" required value = {password} onChange={(e)=>{setPassWord(e.target.value)}}/>
                </label>
                {!validPwd?<p>Password requires 1 lower case letter, <br/> 1 upper case letter, <br/>1 numeric character and a special character</p>:<></>}
                <br/>
                <button disabled={!validName} type='submit'>Sign Up</button>
                {/* <button disabled ={!validName || !validPwd|| !validMatch? true: false} */}
            </form>
            <Link to ='/'>Back to Login Page</Link>
            {!success? <p>{errmsg}</p>:<></>}
        </div>
    )
}