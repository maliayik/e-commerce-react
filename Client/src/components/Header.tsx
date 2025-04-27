import ShoppingCart from "@mui/icons-material/ShoppingCart";
import {AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router";

const links = [
    {title: "Home", to: "/"},
    {title: "Catalog", to: "/catalog"},
    {title: "About", to: "/about"},
    {title: "Contact", to: "/contact"}
]
const navStyles = {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
        color: "text.primary",
    },
    "&.active": {
        color: "warning.main",
    }

}
export default function Header() {
    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Typography variant="h6">E-Commerce</Typography>
                    <List sx={{display: "flex"}}>
                        {links.map(link =>
                            <ListItem component={NavLink} sx={navStyles} to={link.to}>
                                {link.title}
                            </ListItem>)}
                    </List>
                </Box>
                <Box>
                    <Box>
                        <IconButton size={"large"} edge={"start"} color={"inherit"}>
                            <Badge badgeContent={"2"} color={"secondary"}>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}