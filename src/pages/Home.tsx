import { useNavigate } from "react-router-dom";
import { Inventory, LocalOffer, NavigateNext, ShoppingCart, TrendingDown } from "@mui/icons-material";
import { Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Grid container rowGap={2}>
            <Grid container justifyContent="center">
                <img src="/SanMarcosLogo.png" alt="Logo San Marcos" width="100%"></img>
                <Typography>Un celestial sabor picosito</Typography>
            </Grid>
            <Grid container justifyContent="center">
                <Typography variant="h5" fontWeight="bold">Elige un servicio</Typography>
            </Grid>
            <Grid container justifyContent="center">
                <Paper sx={{ width: '90%' }}>
                    <List>
                        <ListItemButton
                            onClick={() => navigate('/Compra')}
                        >
                            <ListItemIcon>
                                <ShoppingCart />
                            </ListItemIcon>
                            <ListItemText primary="Compra de materia prima" />
                            <NavigateNext/>
                        </ListItemButton>
                        <Grid container justifyContent="center">
                            <Divider sx={{ width: '95%' }} />
                        </Grid>
                        <ListItemButton
                            onClick={() => navigate('/Merma')}
                        >
                            <ListItemIcon>
                                <TrendingDown />
                            </ListItemIcon>
                            <ListItemText primary="Mermas sufridas" />
                            <NavigateNext/>
                        </ListItemButton>
                        <Grid container justifyContent="center">
                            <Divider sx={{ width: '95%' }} />
                        </Grid>
                        <ListItemButton
                            onClick={() => navigate('/Venta')}
                        >
                            <ListItemIcon>
                                <Inventory />
                            </ListItemIcon>
                            <ListItemText primary="Venta por cliente" />
                            <NavigateNext/>
                        </ListItemButton>
                        <Grid container justifyContent="center">
                            <Divider sx={{ width: '95%' }} />
                        </Grid>
                        <ListItemButton
                            onClick={() => navigate('/Produccion')}
                        >
                            <ListItemIcon>
                                <LocalOffer />
                            </ListItemIcon>
                            <ListItemText primary="Producción" />
                            <NavigateNext/>
                        </ListItemButton>
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Home;