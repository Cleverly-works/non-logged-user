import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material";

import { MainLayout } from "./components/templates";
import { MainRouter } from "./routing";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <SnackbarProvider>
          <MainRouter />
        </SnackbarProvider>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
