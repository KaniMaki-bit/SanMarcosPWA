import { Grid, Typography } from "@mui/material";

const Header = () => {
    return (
        <Grid container>
            <Grid container justifyContent="center">
                <img src="src\assets\SanMarcosLogo.png" alt="Logo San Marcos" width="30%"></img>
            </Grid>
            <Grid container justifyContent="center">
                <Typography variant="caption">Un celestial sabor picosito</Typography>
            </Grid>
        </Grid>
    );
}

export default Header;