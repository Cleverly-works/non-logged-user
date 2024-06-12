import { SnackbarProvider } from "notistack";

import { MainLayout } from "./components/templates";
import { MainRouter } from "./routing";

function App() {
  return (
    <MainLayout>
      <SnackbarProvider>
        <MainRouter />
      </SnackbarProvider>
    </MainLayout>
  );
}

export default App;
