import React from 'react'
import Modal from 'react-modal';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

export const Button =({grocery_id, groceryName, text, setGroceries})=>{
    const [open, setOpen] = useState(false);
    const [action, setAction]= useState('')
    const [type, setType] = useState('')

    const navigate = useNavigate()

    setType(text)

    const deteleGrocery = async(id) =>{
        const authorization ={
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`,
            }
        }
        
        try{
           console.log(grocery_id)
           console.log(id)
           await axios.delete(`/api/${id}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get('access_token')}`,
            },
            data: {
                grocery_id:id
            },
           
        })
           .then(response=>{ 
               console.log(response.data)
           })
        } catch(err){
           console.log(`Error:${err.messagae}`)
        }
        closeModal()
    }

    const routeToEdit = async(id) => {
        navigate(`/edit/${id}`)
    }
        fetchGroceries()
   }


   const fetchGroceries = async () =>{
    const authorization ={
        headers:{
            Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
    }
    try {
        const reponse = await axios.get('/api', authorization)
        setGroceries(reponse.data)
    }
    catch (err){
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.header)
        } else console.log(`Error: ${err.message}`)
      }
        
   }

    const customStyles = {
        content: {
          width: '400px',
          height: '150px',
          margin: 'auto'
        }
      };
    const openModal = ()=> setOpen(true)

    const closeModal = ()=>setOpen(false)
    return (
        <div>
            {
            type==='Delete' 
            ?  
            <div>
            <button onClick = {openModal}>{text}</button>
                <Modal isOpen={open} onRequestClose={closeModal} style={customStyles} appElement={document.getElementById('root')}>
                    <h2>Are you sure <br/>you want to delete {groceryName}?</h2>
                    <button onClick= {()=>(deteleGrocery(grocery_id))}>Delete</button>
                    <button onClick={closeModal}>Close Modal</button>
                </Modal>
            </div> 
            :   
            <div>
                <button onClick={() => routeToEdit(grocery_id)}>{text}</button>
            </div> 
            }
        </div>
    )
}

