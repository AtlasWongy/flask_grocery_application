import { Button } from "./Button"

export const Header =({text})=>{
    return (
        <header className="header">
            <h1>{text}</h1>
            <Button
                color = 'green'
                text = 'Add'/>
        </header>
    )
}