import { AppBar } from "../../components/AppBar/AppBar"
import { ButtonNew } from "../../components/Button/ButtonNew"
import { Stack, Box } from '@mui/material'
import { Groceries } from "../../components/Groceries/Groceries"
import './Dashboard.css'

export const Dashboard = () => {

    return (
       <Stack spacing={10} direction='column'>
            <AppBar/>
            <Groceries/>
       </Stack>
    )
}