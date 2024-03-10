import { Autocomplete, Grid, Paper, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { PieChart } from "@mui/x-charts";

const Merma = () => {
    const sizes = [
        { label: "Chico" },
        { label: "Mediano" },
        { label: "Grande" }
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
        <Grid container rowGap={5} marginX={3} marginY={2}>
            <Header />
            <Grid container rowGap={2}>
                <Typography>
                    Selecciona el año y mes para identificar el consumo de materia primera durante ese periodo.
                </Typography>
                <Grid container justifyContent="space-between">
                    <Grid item xs={4}>
                        <Autocomplete
                            options={sizes}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label="Tamaño" />}
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
                    Cantidad de merma proximo mes:
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
                            Perdidas esperadas en toneladas y costo
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Merma;