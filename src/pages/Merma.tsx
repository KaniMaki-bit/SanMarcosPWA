import { useEffect, useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import Header from "../components/Header";
import FetchCSVData from "../helpers/FetchData";

const sizes = ["Chico", "Mediano", "Grande"];
const years = ["2023", "2024"];


const Merma = () => {
    const [data, setData] = useState<any>();

    const [months, setMonths] = useState<string[] | null>(null);

    const [year, setYear] = useState<any>(null);
    const [month, setMonth] = useState<any>(null);
    const [size, setSize] = useState<any>(null);

    const [graphData, setGraphData] = useState<any>(null);
    const [dif, setDif] = useState<any>(0);


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
            let produccion;
            let merma;
            if (size === "Chico") {
                produccion = parseInt(data[0][month.toLowerCase()]) ?? 0;
                merma = parseInt(data[1][month.toLowerCase()]) ?? 0;
            } else if (size === "Mediano") {
                produccion = parseInt(data[3][month.toLowerCase()]) ?? 0;
                merma = parseInt(data[4][month.toLowerCase()]) ?? 0;
            } else if (size === "Grande") {
                produccion = parseInt(data[6][month.toLowerCase()]) ?? 0;
                merma = parseInt(data[7][month.toLowerCase()]) ?? 0;
            }

            const diferencia = produccion! - merma!;
            setDif(diferencia);

            setGraphData([
                { id: 0, value: produccion, label: 'Producción' },
                { id: 1, value: merma, label: 'Merma' }
            ])
        }
    }, [month])

    console.log(data);

    return (
        <Grid container rowGap={5} paddingX={3} paddingY={2}>
            <Header />
            <Grid container rowGap={2}>
                <Typography>
                    Selecciona el año y mes para identificar el consumo de materia primera durante ese periodo.
                </Typography>
                <Grid container justifyContent="space-between">
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="select-size-label">Tamaño</InputLabel>
                            <Select
                                labelId="select-size-label"
                                value={size}
                                onChange={(e) => { setSize(e.target.value), setYear(null), setMonth(null), setGraphData(null) }}
                                fullWidth
                                label="Tamaño"
                            >
                                {sizes.map((sizeOption) => (
                                    <MenuItem key={sizeOption} value={sizeOption}>
                                        {sizeOption}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3.5}>
                        <FormControl fullWidth>
                            <InputLabel id="select-year-label">Año</InputLabel>
                            <Select
                                labelId="select-year-label"
                                value={year}
                                onChange={(e) => { setYear(e.target.value), setMonth(null), setGraphData(null) }}
                                disabled={!size}
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
                    <Grid item xs={3.5}>
                        <FormControl fullWidth>
                            <InputLabel id="select-month-label">Mes</InputLabel>
                            <Select
                                labelId="select-month-label"
                                value={month}
                                onChange={(e) => { setMonth(e.target.value) }}
                                disabled={!size && !year}
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
                            height={150}
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
                    Cantidad de merma proximo mes:
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
                                {dif} Toneladas
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
                                Costo ${((dif * 2).toLocaleString())}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Merma;