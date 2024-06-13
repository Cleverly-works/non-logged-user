import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { colors } from "../../../const";

const styles: Record<string, object> = {
  wrapper: {
    zIndex: 10000,
    backgroundColor: colors.defaultBlack,
    opacity: 0.5,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
};

type LoadingLayoutProps = {
  loading: boolean;
  children: JSX.Element;
};

const LoadingLayout = ({ loading, children }: LoadingLayoutProps) => {
  if (loading) {
    return (
      <Box sx={styles.wrapper}>
        <CircularProgress />
      </Box>
    );
  }
  return children;
};

export default LoadingLayout;
