import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RoutesPath } from "../../routing/routes";
import { mainContext } from "../../context";

const styles: Record<string, object> = {
  mt: {
    marginTop: "20px",
  },
  textDefault: {
    textTransform: "none",
  },
};

export const AcknowledgementPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { generalAppParams } = useContext(mainContext);

  const navigateBack = () => {
    navigate(`${RoutesPath.HOME}?${generalAppParams}`);
  };

  return (
    <>
      <Typography typography="h4">Thank you!</Typography>
      <Typography typography="subtitle1" sx={styles.mt}>
        We appreciate you taking the time to report this issue.
      </Typography>
      <Typography typography="subtitle1">
        This is very helpful in helping us maintain our sites and facilities so
        we can all do our best work.
      </Typography>
      <Typography typography="subtitle1" sx={styles.mt}>
        Your issue has been received and allocated reference number:
      </Typography>
      <Typography typography="h5" sx={styles.mt}>
        {searchParams.get("jobId")}
      </Typography>
      <Typography typography="subtitle1" sx={styles.mt}>
        If you have opted to be advised of updates related to this issue, you
        will be contacted separately.
      </Typography>
      <Typography typography="subtitle1">
        These details will only be used for updates related to this issue.
      </Typography>
      <Typography typography="subtitle1" sx={styles.mt}>
        Your Facilities Team
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ ...styles.mt, ...styles.textDefault }}
        onClick={navigateBack}
      >
        Report another issue
      </Button>
    </>
  );
};
