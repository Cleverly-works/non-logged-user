import { Paper, Typography } from "@mui/material";

const styles = {
  paper: {
    height: "100%",
    padding: "20px",
  },
};

export const ErrorPage = () => {
  return (
    <Paper sx={styles.paper}>
      <Typography typography="h4">Error</Typography>
      <Typography typography="h6">
        This tool is available only after QR scan
      </Typography>
    </Paper>
  );
};
