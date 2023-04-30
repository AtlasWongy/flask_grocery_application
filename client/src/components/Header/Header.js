
import { HideButton } from "../hideButton/hideButton"

export const Header =({text, setAddGrocery})=>{
    return (
        <header className="header">
            <h1>{text}</h1>
            <HideButton/>
            
        </header>
        
    )
}