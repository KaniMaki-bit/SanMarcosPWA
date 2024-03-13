import { useEffect, useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import Header from "../components/Header";
import FetchCSVData from "../helpers/FetchData";

const years = ["2023", "2024"];

const Venta = () => {
    const [data, setData] = useState<any>();

    const [clients, setClients] = useState<any[] | null>(null);

    const [client, setClient] = useState<any>(null);
    const [year, setYear] = useState<any>(null);

    const [graphData, setGraphData] = useState<any>(null);
    const [total, setTotal] = useState<any>(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const csvData = await FetchCSVData("Forecast");
                setData(csvData);
                console.log(csvData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data) {
            const tempClient = data.map((line: any, index: number) => {
                const productName = line["NOMBRE DE PRODUCTO"];
                if (productName) {
                    return {
                        name: productName.toUpperCase().split(" ").slice(2).join(" "),
                        index: index
                    };
                } else {
                    return null;
                }
            }).filter((client: any) => client !== null);

            setClients(tempClient);

        }
    }, [data])

    useEffect(() => {
        if (year) {
            const selected = data![client]

            if (year === "2023") {
                const desgloce = {
                    "Marzo": selected.Marzo,
                    "Abril": selected.Abril,
                    "Mayo": selected.Mayo,
                    "Junio": selected.Junio,
                    "Julio": selected.Julio,
                    "Agosto": selected.Agosto,
                    "Septiembre": selected.Septiembre,
                    "Octubre": selected.Octubre,
                    "Noviembre": selected.Noviembre,
                    "Diciembre": selected.Diciembre
                }

                setGraphData([
                    { id: 0, value: desgloce.Marzo, label: 'Mar' },
                    { id: 0, value: desgloce.Abril, label: 'Abr' },
                    { id: 0, value: desgloce.Mayo, label: 'May' },
                    { id: 0, value: desgloce.Junio, label: 'Jun' },
                    { id: 0, value: desgloce.Julio, label: 'Jul' },
                    { id: 0, value: desgloce.Agosto, label: 'Ago' },
                    { id: 0, value: desgloce.Septiembre, label: 'Sep' },
                    { id: 0, value: desgloce.Octubre, label: 'Oct' },
                    { id: 0, value: desgloce.Noviembre, label: 'Nov' },
                    { id: 0, value: desgloce.Diciembre, label: 'Dic' },
                ])

                setTotal(selected[2023])
            } else if (year === "2024") {
                const desgloce = {
                    "Enero": selected.Enero24,
                    "Febrero": selected.Febrero24,
                    "Marzo": selected.Marzo24,
                    "Abril": selected.Abril24
                }

                setGraphData([
                    { id: 0, value: desgloce.Enero, label: 'Enero' },
                    { id: 0, value: desgloce.Febrero, label: 'Febrero' },
                    { id: 0, value: desgloce.Marzo, label: 'Marzo' },
                    { id: 0, value: desgloce.Abril, label: 'Abril' }
                ])

                setTotal(selected[2024])
            }

        }
    }, [year])

    return (
        <Grid container rowGap={5} paddingX={3} paddingY={2}>
            <Header />
            <Grid container rowGap={2}>
                <Typography>
                    Selecciona el cliente, año y mes para identificar el consumo de materia primera durante ese periodo.
                </Typography>
                <Grid container justifyContent="space-between">
                    <Grid item xs={5.5}>
                        <FormControl fullWidth>
                            <InputLabel id="select-client-label">Cliente</InputLabel>
                            <Select
                                labelId="select-client-label"
                                value={client}
                                onChange={(e) => { setClient(e.target.value), setYear(null), setGraphData(null) }}
                                fullWidth
                                label="Cliente"
                            >
                                {clients?.map((clientOption: any) => (
                                    <MenuItem key={clientOption.index} value={clientOption.index}>
                                        {clientOption.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={5.5}>
                        <FormControl fullWidth>
                            <InputLabel id="select-year-label">Año</InputLabel>
                            <Select
                                labelId="select-year-label"
                                value={year}
                                onChange={(e) => { setYear(e.target.value) }}
                                disabled={client===null}
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
                            height={year === "2024" ? 150 : 350}
                        />
                    ) : (
                        <Grid
                            width={365}
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
                    Predicción de ventas próximo periodo:
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
                                Costo ${((total * 2).toLocaleString())}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Venta;