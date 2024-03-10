import { Autocomplete, Grid, Paper, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { PieChart } from "@mui/x-charts";

const Produccion = () => {
    const clients = [
        { label: "Cliente 1" },
        { label: "Cliente 2" },
        { label: "Cliente 3" }
    ];
    const years = [
        { label: "2022" },
        { label: "2023" },
        { label: "2024" }
    ];
    const months = [
        { label: "Enero" },
        { label: "Febrero" },
        { label: "Marzo" },
        { label: "Abril" }
    ];

    return (
        <Grid container rowGap={5} paddingX={3} paddingY={2}>
            <Header />
            <Grid container rowGap={2}>
                <Typography>
                    Selecciona el cliente, año y mes para identificar el consumo de materia primera durante ese periodo.
                </Typography>
                <Grid container justifyContent="space-between">
                    <Grid item xs={4}>
                        <Autocomplete
                            options={clients}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Cliente" />}
                        />
                    </Grid>
                    <Grid item xs={3.5}>
                        <Autocomplete
                            options={years}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Año" />}
                        />
                    </Grid>
                    <Grid item xs={3.5}>
                        <Autocomplete
                            options={months}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Mes" />}
                        />
                    </Grid>
                </Grid>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                        },
                    ]}
                    width={325}
                    height={200}
                />
            </Grid>
            <Grid container rowGap={2} paddingX={2}>
                <Typography>
                    Inventario restante:
                </Typography>
                <Paper
                    sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#181F34",
                    }}
                >
                    <Grid container paddingX={2} justifyContent="center" alignContent="center" height="100%">
                        <Typography
                            color={"#C6E7DE"}
                            sx={{
                                textAlign: "justify",
                            }}
                        >
                            Lista de productos restantes en contra de las ventas de cada cliente
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}
 
export default Produccion;