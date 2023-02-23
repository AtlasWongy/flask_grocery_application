import axios from "axios";
import { useState, useEffect } from 'react'
import { useParams } from "react-router";

export const EditGroceries = () => {
    const [numOfGrocery, setNumOfGrocery] = useState([])
    const groceryID = useParams()
    console.log(groceryID)

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
                await axios.put(`/api/${parseInt(groceryID.id)}`, editData)
            } catch(err) {
                console.log(`Error: ${err.message}`)
            }
        }
        EditToDB()
        setNumOfGrocery('')
    }

    return (
        <div>
            <h3>Editing the quanity of the grocery</h3>
            <form className="edit-form" onSubmit={handleSubmit}>
                <label>New Quanity: </label>
                <input
                    type = "number"
                    placeholder='New Quanity'
                    onChange ={(e)=>{setNumOfGrocery(e.target.value)}}
                />
                <input type = "submit" value = 'Update' className="btn btn-block"></input>
            </form>
        </div>
    )
}