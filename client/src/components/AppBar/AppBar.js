import {
    AppBar as Bar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Drawer
} from '@mui/material'
import { useState } from 'react'
import { AccountCircle } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'



export const AppBar = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [state, setState] = useState({
        left: false
    })

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleSideBar = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        console.log("I Clicked!!!!!!!!")

        setState({...state, [anchor]: open})
    }

    const list = (anchor) => (
        <Box 
            sx = {{ width: 250 }}
            role="presentation"
            onClick = {handleSideBar(anchor, false)}
            onKeyDown = {handleSideBar(anchor, false)}
        >
            <List>
                {['Logout'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton key = {index}>
                            <ListItemText primary = {text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <div>
            <Bar>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx = {{ mr : 2}}
                        onClick={handleSideBar('left', true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Drawer
                        anchor='left'
                        open={state['left']}
                        onClose={handleSideBar('left', false)}
                    >
                        {list('left')}
                    </Drawer>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >Grocery Dashboard</Typography>
                    <div>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-control='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleMenu}
                            color='inherit'
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My Account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </Bar>
        </div>
    )
}