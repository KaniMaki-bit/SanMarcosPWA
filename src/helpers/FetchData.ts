import axios from 'axios';

type CsvUrlList = {
    [key: string]: string;
};

const FetchCSVData = async (fileName: string) => {
    const csvUrlList: CsvUrlList = {
        "Produccion": 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRtCWkDjPiUjSNXdpC_dyTLB9E0UHT3V0TgLy6AQFHpsTzdF1dON5t2Wg54M4HtCHWHdmP9ra07PWSS/pub?output=csv',
        "Compra": 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4_sjRbg3wyXf5dvAGkDSHOkJM4Wx9mxBuMTtZGCss5sThrybD_BrS3-KeF3woPQ9AaeNlCUHcpHMa/pub?output=csv',
        "Forecast": 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRTBBbG1Aoy1E5W169i3U-o4mnIF5RXgiPrJmcmc1FqxaIimJNKbWgDqtd4SvV_ljgIJsP84raTOyj/pub?output=csv'
    }

    const csvUrl = csvUrlList[fileName];

    const parseCSV = (csvText: any) => {
        const headerIndex = fileName === "Produccion" ? 0 : fileName === "Compra" ? 3 : 1;
        const rows = csvText.split(/\r?\n/);
        const headers = rows[headerIndex].split(',');
        const data = [];
        for (let i = headerIndex + 1; i < rows.length; i++) {
            const rowData = rows[i].split(',');
            const rowObject: any = {};
            for (let j = 0; j < headers.length; j++) {
                rowObject[headers[j]] = rowData[j];
            }
            data.push(rowObject);
        }
        return data;
    }

    try {
        const response = await axios.get(csvUrl);
        const parsedCsvData = parseCSV(response.data);
        return parsedCsvData;
    } catch (error) {
        console.error('Error fetching CSV data:', error);
        return undefined;
    }
}

export default FetchCSVData;
