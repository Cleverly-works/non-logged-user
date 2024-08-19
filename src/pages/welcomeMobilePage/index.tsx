import React, { useContext, useMemo } from "react";
import { Stack, Typography, Button } from "@mui/material";

import logo from "../../images/icon-white.png";
import { colors } from "../../const";
import { useNavigate } from "react-router-dom";
import { usePredefinedQueryParams } from "../../hooks";
import { RoutesPath } from "../../routing/routes";
import { mainContext } from "../../context";

const styles = {
  image: {
    width: "80px",
    height: "80px",
  },
  subtitle: {
    color: colors.halfTransparentBlue,
  },
  label: {
    maxWidth: "300px",
    color: colors.activeGreen,
    marginBottom: "30px",
    textAlign: "center",
  },
  startButton: {
    backgroundColor: colors.activeGreen,
    borderRadius: "20px",
    width: "150px",
    "&:hover": {
      backgroundColor: colors.activeGreen,
      opacity: 0.8,
    },
  },
};

export const WelcomeMobilePage: React.FC = () => {
  const navigate = useNavigate();

  const { setHasShowedWelcomeMobileScreen } = useContext(mainContext);
  const { rawStringParams } = usePredefinedQueryParams();

  const homeUrl = useMemo(
    () => `${RoutesPath.HOME}?${rawStringParams}`,
    [rawStringParams],
  );

  const handleNavigateToHomeScreen = () => {
    navigate(homeUrl);
    setHasShowedWelcomeMobileScreen(true);
  };

  return (
    <Stack alignItems="center" p={2} rowGap={4}>
      <img src={logo} style={styles.image} alt="..." />
      <Stack ml={5} mt={2}>
        <Typography typography="h5" textAlign="center" mb={2}>
          Welcome to the Homyze issue reporting tool.
        </Typography>
        <Typography typography="h6" textAlign="center" sx={styles.subtitle}>
          Brought to you by Cleverly.
        </Typography>
      </Stack>
      <Typography typography="h6" sx={styles.label}>
        Here, you can report an issue quickly and easily.
      </Typography>
      <Button
        onClick={handleNavigateToHomeScreen}
        sx={styles.startButton}
        size="large"
        variant="contained"
      >
        Start
      </Button>
    </Stack>
  );
};
