import {AppBar} from "../../components/AppBar/AppBar"
import {Stack, Box} from '@mui/material'
import {Groceries} from "../../components/Groceries/Groceries"
import './Dashboard.css'
import {AddButton} from "../../components/AddButton/AddButton"

export const Dashboard = () => {

    return (
        <Stack spacing={10} direction='column'>
            <AppBar/>
            <AddButton/>
            <Groceries/>
        </Stack>
    )
}