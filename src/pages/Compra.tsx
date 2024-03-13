import { useEffect, useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import Header from "../components/Header";
import FetchCSVData from "../helpers/FetchData";

const years = ["2023", "2024"];

const Compra = () => {
    const [data, setData] = useState<any>();
    const [months, setMonths] = useState<string[]|null>(null);
    const [year, setYear] = useState<any>(null);
    const [month, setMonth] = useState<any>(null);
    const [graphData, setGraphData] = useState<any>(null);
    const [total, setTotal] = useState<any>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const csvData = await FetchCSVData("Compra");
                setData(csvData);
                console.log(csvData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (year === "2023") {
            setMonths([
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ]);
        } else {
            setMonths([
                "Enero",
                "Febrero"
            ]);
        }
    }, [year])

    useEffect(() => {
        if (month) {
            //const periodo = `${month.toLowerCase().slice(0,3)}-${year.slice(2)}`
            const chico = parseInt(data[0][month.toLowerCase()]);
            const mediano = parseInt(data[3][month.toLowerCase()]);
            const grande = parseInt(data[6][month.toLowerCase()]);
            const totalMes = parseInt(data[8][month.toLowerCase()]);
            setTotal(totalMes);

            setGraphData([
                { id: 0, value: chico, label: 'Chico' },
                { id: 1, value: mediano, label: 'Mediano' },
                { id: 2, value: grande, label: 'Grande' },
            ])
        }
    }, [month])

    return (
        <Grid container rowGap={5} paddingX={3} paddingY={2}>
            <Header />
            <Grid container rowGap={2}>
                <Typography>
                    Selecciona el año y mes para identificar el consumo de materia primera durante ese periodo.
                </Typography>
                <Grid container justifyContent="space-between">
                    <Grid item xs={5.5}>
                        <FormControl fullWidth>
                            <InputLabel id="select-year-label">Año</InputLabel>
                            <Select
                                labelId="select-year-label"
                                value={year}
                                onChange={(e) => { setYear(e.target.value), setMonth(null), setGraphData(null) }}
                                fullWidth
                                label="Año"
                            >
                                {years.map((yearOption) => (
                                    <MenuItem key={yearOption} value={yearOption}>
                                        {yearOption}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5.5}>
                        <FormControl fullWidth>
                            <InputLabel id="select-month-label">Mes</InputLabel>
                            <Select
                                labelId="select-month-label"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                disabled={!year}
                                fullWidth
                                label="Mes"
                            >
                                {months?.map((monthOption) => (
                                    <MenuItem key={monthOption} value={monthOption}>
                                        {monthOption}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {
                    graphData ? (
                        <PieChart
                            series={[
                                {
                                    data: graphData,
                                },
                            ]}
                            width={325}
                            height={200}
                        />
                    ) : (
                        <Grid
                            width={325}
                            height={200}
                        >
                            <Paper
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Typography>Selecciona un periodo</Typography>
                            </Paper>
                        </Grid>
                    )
                }
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
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Typography color={"#C6E7DE"}>
                                {total} Toneladas
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Typography color={"#C6E7DE"}>
                                Costo ${((total * 2).toLocaleString())}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Compra;