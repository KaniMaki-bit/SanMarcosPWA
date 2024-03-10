import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Lexend, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "#114877",
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#181F34',
                },
            },
        },
    },
});

export default theme;