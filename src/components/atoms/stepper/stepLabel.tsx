import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const styles: Record<string, object> = {
  stepBadgeWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30px",
    height: "30px",
  },
  stepBadge: {
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #020202",
    borderRadius: "50%",
    marginRight: "10px",
  },
};

type StepLabelProps = {
  counter: number;
  text: string;
};

const StepLabel: React.FC<StepLabelProps> = ({ counter, text }) => {
  return (
    <Stack direction="row" alignItems="center" columnGap={1}>
      <Box sx={styles.stepBadgeWrapper}>
        <Box sx={styles.stepBadge}>{counter}</Box>
      </Box>
      <Typography typography="h6">{text}</Typography>
    </Stack>
  );
};

export default StepLabel;
