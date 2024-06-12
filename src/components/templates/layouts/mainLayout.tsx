import React from "react";
import { AppBar, Box, Stack, Typography, useMediaQuery } from "@mui/material";

import { colors } from "../../../const";

const styles: Record<string, any> = {
  main: {
    height: "95vh",
  },
  body: (isWidth400pxOrLess: boolean) => ({
    padding: isWidth400pxOrLess ? "5px" : "40px",
    height: "100%",
  }),
  appBar: {
    height: "7rem",
    padding: "1em 3em",
    backgroundColor: colors.appBarBackground,
  },
  title: {
    color: colors.mainBlue,
  },
  image: {
    width: "50px",
    height: "50px",
  },
};

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isWidth400pxOrLess = useMediaQuery("(max-width: 430px)");

  return (
    <>
      <AppBar position="static" sx={styles.appBar}>
        <Stack direction="row" rowGap={2}>
          <img style={styles.image} alt="..." />
          <Stack>
            <Typography typography="h5" sx={styles.title}>
              Welcome to Homyze
            </Typography>
            <Typography typography="h5">
              Here you can report an issue quickly and easily
            </Typography>
          </Stack>
        </Stack>
      </AppBar>
      <Box sx={styles.body(isWidth400pxOrLess)}>{children}</Box>
    </>
  );
};

export default MainLayout;
