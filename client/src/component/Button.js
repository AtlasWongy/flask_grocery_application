import React from 'react'
import Modal from 'react-modal';
import { useState } from 'react';
import axios from 'axios';

export const Button =({grocery_id, groceryName, text})=>{
    const [open, setOpen] = useState(false);
    const [action, setAction]= useState('')

    const deteleGrocery = async(id) =>{
        
        try{
           console.log(grocery_id)
           console.log(id)
           await axios.delete(`/api/${id}`,{
               data:{
                   grocery_id:id
               }
           })
           .then(response=>{ 
               console.log(response.data)
           })
        } catch(err){
           console.log(`Error:${err.messagae}`)
        }
        closeModal()
   }
    const customStyles = {
        content: {
          width: '400px',
          height: '150px',
          margin: 'auto'
        }
      };
    const openModal =()=> setOpen(true)

    const closeModal =()=>setOpen(false)
    return (
        <div>
            <button onClick = {openModal}>{text}</button>
            <Modal isOpen={open} onRequestClose={closeModal} style={customStyles} appElement={document.getElementById('root')}>
                <h2>Are you sure <br/>you want to delete {groceryName}?</h2>
                <button onClick= {()=>(deteleGrocery(grocery_id))}>Delete</button>
                <button onClick={closeModal}>Close Modal</button>
            </Modal>
        </div>
    )
}

