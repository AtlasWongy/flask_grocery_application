import axios from 'axios'
import React from 'react'
import { Button } from './Button'
import './style.css';
import {
    useParams,
    Link
} from 'react-router-dom'

export const Grocery = ({grocery, setGroceries}) => {
    
    const grocery_id = grocery.grocery_id
    const groceryName = grocery.grocery
    


    const deteleGrocery = async(id) =>{
        
         try{
            console.log(grocery.grocery_id)
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
    }

    const routeToEdit = async(id) => {
        // navigate(`/edit/${id}`)
    }

    return(
        <div>
            <table>
                <tr>
                    <th>Grocery</th>
                    <th>Quantity</th>
                    <th>Deadline to Get</th>
                    <th></th>
                </tr>
                <tr>
                    <td>{grocery.grocery}</td>
                    <td>{grocery.quantity}</td>
                    <td>{grocery.date_to_get}</td>
                    <>
                        <Button grocery_id={grocery_id} groceryName={groceryName} setGroceries={setGroceries} text ={"Delete"}/>
                        <Button grocery_id={grocery_id} groceryName={groceryName} setGroceries={setGroceries} text = {"Edit"}/>
                    </>
                </tr>

            </table>
        </div>
    )
}

export default Grocery