import React from "react";
import { AppBar, Box, Stack, Typography, useMediaQuery } from "@mui/material";

import { colors } from "../../../const";
import background from "../../../images/background1.svg";

const styles: Record<string, any> = {
  main: {
    height: "95vh",
  },
  body: (isWidth425pxOrLess: boolean) => ({
    padding: isWidth425pxOrLess ? "5px" : "40px",
    height: "100%",
    backgroundImage: `url('${background}')`,
    backgroundRepeat: "no-repeat",
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
  const isWidth425pxOrLess = useMediaQuery("(max-width: 425px)");

  return (
    <>
      <AppBar position="static" sx={styles.appBar}>
        <Stack direction="row" alignItems="center" rowGap={2}>
          <img
            src={require("../../../images/icon-white.png")}
            style={styles.image}
            alt="..."
          />
          {!isWidth425pxOrLess && (
            <Stack ml={5}>
              <Typography typography="h5" sx={styles.title}>
                Welcome to Homyze issue reporting tool brought to you by
                Cleverly
              </Typography>
              <Typography typography="h5">
                Here you can report an issue quickly and easily
              </Typography>
            </Stack>
          )}
        </Stack>
      </AppBar>
      <Box sx={styles.body(isWidth425pxOrLess)}>{children}</Box>
    </>
  );
};

export default MainLayout;
