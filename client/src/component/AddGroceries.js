import axios from 'axios'
import {useState} from 'react'

export const AddGroceries = ()=>{
    const [grocery, setGrocery] = useState('')
    const [quantity, setQuantity] = useState('')
    const [date, setDate] = useState('')

    const onSubmit = (e)=>{
        e.preventDefault()
        if(!grocery){
            alert("Please add inputs")
            return
        }
        const addToDB = async ()=>{

            try{
                const postData = {
                    grocery: grocery,
                    quantity: quantity,
                    date_to_get: date
                }
                const response = await axios.post('/api/add',postData)
                response.then(console.log(response.data))
            } catch (e){
                console.log(`Error: ${e.message}`)
            }
        }
        addToDB ()
        setGrocery('')
        setQuantity('')
        setDate('')
    }
    return(
        <form className ="add-form" onSubmit={onSubmit}>
            <div>
                <label>Grocery Name</label>
                <input 
                    type = "text"
                    placeholder='Grocery Name'
                    value = {grocery}
                    onChange ={(e)=>{setGrocery(e.target.value)}}
                ></input>
                <h4>Please Input Grocery to Get</h4>
            </div>
            <div>
                <label>Quantity</label>
                <input 
                    type = "text"
                    placeholder='DD/MM/YY'
                    value = {quantity}
                    onChange = {(e)=>{setQuantity(e.target.value)}}
                ></input>
            </div>
            <div>
                <label>Date to Get</label>
                <input 
                    type = "text"
                    placeholder='Date'
                    value = {date}
                    onChange = {(e)=>{setDate(e.target.value)}}
                ></input>
            </div>
            <input type = "submit" value = 'Save' className="btn btn-block"></input>
        </form>
    )
}