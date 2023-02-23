import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router'

export const Grocery = ({grocery}) => {

    const navigate = useNavigate()

    const deteleGrocery = async(id) =>{
         try{
            console.log(grocery.grocery_id)
            await axios.delete(`/api/${id}`, {
                data: {
                    grocery_id: id
                }
            })
         } catch(err){
            console.log(`Error:${err.messagae}`)
         }
    }

    const routeToEdit = async(id) => {
        navigate(`/edit/${id}`)
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
                    <td>
                        <button onClick = {()=>deteleGrocery(grocery.grocery_id)}>Delete</button>
                        <button onClick ={()=>routeToEdit(grocery.grocery_id)}>Edit</button>
                    </td>
                </tr>

            </table>
        </div>
    )
}

export default Grocery