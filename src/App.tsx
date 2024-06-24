import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material";

import { MainLayout } from "./components/templates";
import { MainRouter } from "./routing";
import { MainContext } from "./context";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainContext>
        <MainLayout>
          <SnackbarProvider>
            <MainRouter />
          </SnackbarProvider>
        </MainLayout>
      </MainContext>
    </ThemeProvider>
  );
}

export default App;
