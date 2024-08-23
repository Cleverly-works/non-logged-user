import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import cleverlyLogo from "../../../images/cleverly-logo.png";

import { colors } from "../../../const";
import { MobileStepper, Stepper } from "../../organisms";
import { mainContext } from "../../../context";

const styles: Record<string, any> = {
  main: {
    height: "95vh",
  },
  body: (isWidth450pxOrLess: boolean) => ({
    padding: isWidth450pxOrLess ? "5px" : "40px",
    height: "100%",
    backgroundColor: colors.appBarBackground,
    color: colors.defaultWhite,
    backgroundRepeat: "no-repeat",
  }),
  appBar: {
    display: "flex",
    justifyContent: "center",
    height: "10rem",
    padding: "0 8em",
    borderBottom: `1px solid ${colors.separatorBlue}`,
    backgroundColor: colors.appBarBackground,
  },
  subtitle: {
    color: colors.halfTransparentBlue,
  },
  image: {
    width: "50px",
    height: "50px",
  },
  footerImage: {
    width: "200px",
    height: "44px",
  },
  stepper: (isBlurred: boolean) => ({
    borderRight: `1px solid ${colors.separatorBlue}`,
    backdropFilter: isBlurred ? "blur(3px)!important" : "none",
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "100%",
  }),
};

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isWidth450pxOrLess = useMediaQuery("(max-width: 450px)");
  const { currentStep } = useContext(mainContext);

  return (
    <>
      {!isWidth450pxOrLess && (
        <AppBar position="static" sx={styles.appBar}>
          <Stack direction="row" alignItems="center" rowGap={2}>
            <img
              src={require("../../../images/icon-white.png")}
              style={styles.image}
              alt="..."
            />
            <Stack ml={5}>
              <Typography typography="h5">
                Welcome to the Homyze issue reporting tool.
              </Typography>
              <Typography typography="h6" sx={styles.subtitle}>
                Brought to you by Cleverly.
              </Typography>
            </Stack>
          </Stack>
        </AppBar>
      )}
      <Box sx={styles.body(isWidth450pxOrLess)}>
        <Grid container height="86%">
          <Grid
            item
            xs={12}
            md={3}
            sx={styles.stepper(currentStep > 3)}
            minHeight="100px"
          >
            <Stack
              alignItems="center"
              display="inline-flex"
              height="100%"
              width="100%"
            >
              {isWidth450pxOrLess ? (
                <MobileStepper maxSteps={4} />
              ) : (
                <>
                  <Stepper currentStep={currentStep} />
                  <Stack alignItems="center" mt="6em">
                    <a
                      href="https://www.cleverly.works/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={cleverlyLogo}
                        alt="..."
                        style={styles.footerImage}
                      />
                    </a>
                    <Typography typography="subtitle2">
                      © Cleverly Limited 2024
                    </Typography>
                  </Stack>
                </>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={9} height="inherit">
            {children}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MainLayout;
