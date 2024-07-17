import React, { useContext } from "react";
import { Button, Typography, Box, Divider, useMediaQuery } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RoutesPath } from "../../routing/routes";
import { mainContext } from "../../context";
import { colors } from "../../const";

const styles: Record<string, object> = {
  mt: {
    marginTop: "20px",
  },
  divider: {
    marginTop: "10px",
    marginBottom: "4em",
    height: "2px",
    backgroundColor: colors.separatorBlue,
  },
  subtitle: {
    color: colors.halfTransparentBlue,
    marginTop: "10px",
  },
  textDefault: {
    textTransform: "none",
  },
  reportAnotherIssueButton: {
    textTransform: "none",
    marginTop: "40px",
    fontSize: "18px",
    backgroundColor: colors.activeGreen,
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: colors.activeGreen,
      opacity: 0.8,
    },
  },
};

export const AcknowledgementPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isWidth425pxOrLess = useMediaQuery("(max-width: 425px)");

  const { generalAppParams, setCurrentStep } = useContext(mainContext);

  const navigateBack = () => {
    navigate(`${RoutesPath.HOME}?${generalAppParams}`);
    setCurrentStep(0);
  };

  return (
    <Box p={4}>
      {!isWidth425pxOrLess && (
        <Typography typography="h4">Thank you!</Typography>
      )}
      <Typography
        typography={isWidth425pxOrLess ? "h6" : "subtitle1"}
        sx={styles.subtitle}
      >
        We appreciate you taking the time to report this issue.
      </Typography>
      <Typography
        typography={isWidth425pxOrLess ? "h6" : "subtitle1"}
        sx={styles.subtitle}
      >
        This is very helpful in helping us maintain our sites and facilities so
        we can all do our best work.
      </Typography>
      <Divider orientation="horizontal" sx={styles.divider} />
      <Typography typography="h5" sx={styles.mt}>
        Your issue has been received and allocated reference number:
      </Typography>
      <Typography typography="h5" sx={styles.mt}>
        J&nbsp;{searchParams.get("jobId")}
      </Typography>
      <Typography typography="subtitle1" sx={styles.subtitle}>
        If you have opted to be advised of updates related to this issue, you
        will be contacted separately.
      </Typography>
      <Typography typography="subtitle1" sx={styles.subtitle}>
        These details will only be used for updates related to this issue.
      </Typography>
      <Typography typography="h5" sx={styles.mt}>
        Your Facilities Team
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={styles.reportAnotherIssueButton}
        onClick={navigateBack}
      >
        Report another issue
      </Button>
    </Box>
  );
};
