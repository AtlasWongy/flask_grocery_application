import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export const EditGroceries =( { groceryID })=> {   
  
  const [numOfGrocery, setNumOfGrocery] = useState([])
  const grocery_id = groceryID
  

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!numOfGrocery) {
      alert("Please provide an input")
      return
    }
    const EditToDB = async() => {
      try {
        const editData = {
          grocery_id: groceryID,
          quantity: numOfGrocery
        }
        await axios.put(`/api/${parseInt(grocery_id)}`, editData)
      } catch (err) {
        console.log(`Error: {$err.message}`)
      }
    }
    EditToDB()
    setNumOfGrocery('')
  }

  return (
    <div>
      <h3> Editing the quanity of the grocery </h3>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>New Quanity: </label>
        <input
          type = "number"
          placeholder="New Quantity"
          onChange = {(e) => {setNumOfGrocery(e.target.value)}}
        />
        <input type = "submit" value = "update" className="btn btn-block"></input>
      </form>
    </div>
  )
}
