import { useEffect, useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import Header from "../components/Header";
import FetchCSVData from "../helpers/FetchData";

const years = ["2024", "2025"];

const Produccion = () => {
    const [data, setData] = useState<any>();

    const [products, setProducts] = useState<any[] | null>(null);

    const [product, setProduct] = useState<any>(null);
    const [year, setYear] = useState<any>(null);

    const [graphData, setGraphData] = useState<any>(null);
    const [total, setTotal] = useState<any>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const csvData = await FetchCSVData("Produccion");
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
            const tempProduct = data.map((line: any, index: number) => {
                const productName = line["Descripción"];
                if (productName) {
                    return {
                        name: productName,
                        index: index
                    };
                } else {
                    return null;
                }
            }).filter((product: any) => product !== null);

            setProducts(tempProduct);

        }
    }, [data])

    useEffect(() => {
        if (year) {
            const selected = data![product]

            if (year === "2024") {
                const desgloce = {
                    "Febrero": selected["feb-24"],
                    "Marzo": selected["mar-24"],
                    "Abril": selected["abr-24"],
                    "Mayo": selected["may-24"],
                    "Junio": selected["jun-24"],
                    "Julio": selected["jul-24"],
                    "Agosto": selected["ago-24"],
                    "Septiembre": selected["sep-24"],
                    "Octubre": selected["oct-24"],
                    "Noviembre": selected["nov-24"],
                    "Diciembre": selected["dic-24"],
                }

                const tempGraphData = Object.entries(desgloce)
                    .filter(([_mes, valor]) => valor !== 0 && valor !== null)
                    .map(([mes, valor]) => ({ id: 0, value: valor, label: mes.substring(0, 3) }));

                setGraphData(tempGraphData);

                const sumatoria = Object.values(desgloce).reduce((total, valor) => total + (valor || 0), 0);
                setTotal(sumatoria)
            } else if (year === "2025") {
                const desgloce = {
                    "Enero": selected["ene-25"],
                }

                setGraphData([
                    { id: 0, value: desgloce.Enero, label: 'Enero' }
                ])

                setTotal(desgloce.Enero)
            }

        }
    }, [year])

    return (
        <Grid container rowGap={5} paddingX={3} paddingY={2}>
            <Header />
            <Grid container rowGap={2}>
                <Typography>
                    Selecciona el cliente y año para identificar el consumo de materia primera durante ese periodo.
                </Typography>
                <Grid container justifyContent="space-between">
                    <Grid item xs={5.5}>
                        <FormControl fullWidth>
                            <InputLabel id="select-product-label">Producto</InputLabel>
                            <Select
                                labelId="select-product-label"
                                value={product}
                                onChange={(e) => { setProduct(e.target.value), setYear(null), setGraphData(null) }}
                                fullWidth
                                label="Producto"
                            >
                                {products?.map((productOption: any) => (
                                    <MenuItem key={productOption.index} value={productOption.index}>
                                        {productOption.name}
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
                                disabled={product === null}
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
                            height={year === "2025" ? 150 : 350}
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
                    Total en el año:
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
                            Toneladas {total}
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Produccion;