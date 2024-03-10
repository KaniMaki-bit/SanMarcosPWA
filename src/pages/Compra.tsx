import { Autocomplete, Grid, Paper, TextField, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import Header from "../components/Header";

const Compra = () => {
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
        <Grid container rowGap={5} paddingX={3} marginY={2}>
            <Header />
            <Grid container rowGap={2}>
                <Typography>
                    Selecciona el año y mes para identificar el consumo de materia primera durante ese periodo.
                </Typography>
                <Grid container justifyContent="space-between">
                    <Grid item xs={5.5}>
                        <Autocomplete
                            options={years}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Año" />}
                        />
                    </Grid>
                    <Grid item xs={5.5}>
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
                    Costo de inversión previsto:
                </Typography>
                <Paper
                    sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#181F34",
                    }}
                >
                    <Grid container justifyContent="center" alignContent="center" height="100%">
                        <Typography
                            color={"#C6E7DE"}
                        >
                            Costo de inversión total: $450
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Compra;