import axios from 'axios'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

export const AddGroceries = ({setGroceries})=>{
    const [grocery, setGrocery] = useState('')
    const [quantity, setQuantity] = useState('')
    const [date, setDate] = useState('')
    const [input, setInput] = useState(true)
    
    const onSubmit = (e)=>{
        e.preventDefault()
        if(!grocery){
            setInput(false)
            return
        }
        const addToDB = async ()=>{
            try{
                const postData = {
                    grocery: grocery,
                    quantity: quantity,
                    date_to_get: date,
                    userId: Cookies.get('userId')
                }
                const response = await axios.post('/api/add',postData)
                // response.then(console.log(response.data))
            } catch (e){
                console.log(`Error: ${e.message}`)
            }
        }
        
        addToDB ()
        setGrocery('')
        setQuantity('')
        setDate('')
        setInput(true)
        fetchGroceries()
    }

    const fetchGroceries = async ()=>{
        console.log(Cookies.get('userId'))
        const authorization ={
          headers:{
              Authorization: `Bearer ${Cookies.get('access_token')}`,
          },
      }
        try{
          const response = await axios.get('/api',authorization)
          setGroceries(response.data)
      
        } catch (err){
          if(err.response){
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.header)
          } else console.log(`Error: ${err.message}`)
        }
      }

    // Timer count down for messages
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setInput(true)
        }, 4000)
        return () => {
          clearTimeout(timeoutId)
        };
      }, [input])

    return(
        <form className ="add-form" onSubmit={onSubmit}>
            {!input?<p>Please Add Inputs</p>:''}
            <div className = 'form-control'>
                <label>Grocery Name</label>
                <input 
                    type = "text"
                    placeholder='Grocery Name'
                    value = {grocery}
                    onChange ={(e)=>{setGrocery(e.target.value)}}
                ></input>
                {/* <h4>Please Input Grocery to Get</h4> */}
            </div>
            <div className = 'form-control'>
                <label>Quantity</label>
                <input 
                    type = "text"
                    placeholder='-'
                    value = {quantity}
                    onChange = {(e)=>{setQuantity(e.target.value)}}
                ></input>
            </div>
            <div className = 'form-control'>
                <label>Date to Get</label>
                <input 
                    type = "text"
                    placeholder='DD/MM/YY'
                    value = {date}
                    onChange = {(e)=>{setDate(e.target.value)}}
                ></input>
            </div>
            <input type = "submit" value = 'Save' className="btn btn-block"></input>
        </form>
    )
}