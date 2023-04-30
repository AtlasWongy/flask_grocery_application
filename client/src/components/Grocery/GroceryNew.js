import React from 'react'
import { Button } from '../Button/Button'
import './Grocery.css';

export const Grocery = ({grocery, setGroceries}) => {
    
    const grocery_id = grocery.grocery_id
    const groceryName = grocery.grocery
    
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