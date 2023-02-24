import React from 'react'
import Modal from 'react-modal';
import { useState } from 'react';
import { Logout } from '../loginPage2.0/Logout';
import Cookies from 'js-cookie';
// import {RandomHash} from 'random-hash'


export const PromptTimeOut = ({setAccessToken, setPromptSession, cookzLifeSpan}) =>{
    const [open, setOpen] = useState(true);
    // const navigate = useNavigate();
    const customStyles = {
        content: {
            width: '400px',
            height: '150px',
            margin: 'auto'
        }
    };
    const d= new Date();
    d.setTime(d.getTime() + cookzLifeSpan);

    const handleExtend =()=>{
        // Cookies.remove('access_token')
        if (Cookies.get('access_token')===undefined){
            console.log('cookies is undefined')
            setAccessToken(null)
            Cookies.remove('userId')
            localStorage.removeItem('access_token');
            document.title ="Session Expired"
            alert('You Session Expired')
        }
        else{ 
            Cookies.set('access_token', localStorage.getItem('access_token'), { expires: d })
            // const placeHolder = RandomHash({length: 20})
            let r = Math.random().toString(36).substring(7)
            console.log(r)
            setAccessToken(r)
            // setAccessToken(Cookies.get('access_token'))
            // updateAccessToken("placeholder")
            // updateAccessToken(Cookies.get('access_token'))
            setPromptSession(false)
         }
        // window.location.reload()
    }

    const closeModal =()=>setOpen(false)   
  return (
    <div>
        <Modal isOpen ={open} style={customStyles} appElement={document.getElementById('root')}>
            <p>
                Your session will expire in 1 minutes. <br/>
                Click 'Yes' to extend your session. <br/>
                Click 'No' to exit your sessions.
            </p>
            <button onClick={()=>{handleExtend(); closeModal()}}>Yes</button>
            <button><a href="/logout" style={{textDeclaration:'none'}}>No</a></button>
            {/* <a href = '/logout'><button onClick={()=>{closeModal()}}>No</button></a> */}
        </Modal>
    </div>
  )
}
