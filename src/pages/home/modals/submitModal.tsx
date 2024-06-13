import React from "react";
import { Modal, Typography, Stack, Button, Box } from "@mui/material";

import { colors } from "../../../const";
import { IssueType } from "../../../components/molecules";

const styles: Record<string, any> = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    width: "400px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    backgroundColor: colors.defaultWhite,
    zIndex: 10000,
  },
  infoItem: {
    margin: "10px 0px",
    alignItems: "center",
  },
  label: {
    width: "160px",
    fontWeight: "600",
  },
  value: {
    overflow: "hidden",
    whiteSpace: "no-wrap",
    textOverflow: "ellipsis",
    width: "250px",
    marginLeft: "50px",
  },
  bottomButtons: {
    justifyContent: "space-between",
    marginTop: "25px",
  },
  backButton: {
    color: colors.defaultBlack,
    borderColor: colors.defaultBlack,
    ":hover": {
      borderColor: colors.defaultBlack,
    },
  },
};

type SubmitModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: any;
};

const SubmitModal: React.FC<SubmitModalProps> = ({
  open,
  onClose,
  onSubmit,
  formData,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modal}>
        <Typography typography="h5" textAlign="center">
          Please check the information entered is correct
        </Typography>
        <Stack direction="row" sx={styles.infoItem}>
          <Typography typography="subtile1" sx={styles.label}>
            Your location:&nbsp;
          </Typography>
          <Typography typography="subtile2" sx={styles.value}>
            {formData.location.label}
          </Typography>
        </Stack>
        <Stack direction="row" sx={styles.infoItem}>
          <Typography typography="subtile1" sx={styles.label}>
            Relevant issue:&nbsp;
          </Typography>
          <IssueType {...formData.issueType} displayMode />
        </Stack>
        <Stack direction="row" sx={styles.infoItem}>
          <Typography typography="subtile1" sx={styles.label}>
            Description:&nbsp;
          </Typography>
          <Typography typography="subtile2" sx={styles.value}>
            {formData.description}
          </Typography>
        </Stack>
        <Stack direction="row" sx={styles.infoItem}>
          <Typography typography="subtile1" sx={styles.label}>
            Your name:&nbsp;
          </Typography>
          <Typography typography="subtile2" sx={styles.value}>
            {formData.name}
          </Typography>
        </Stack>
        <Stack direction="row" sx={styles.infoItem}>
          <Typography typography="subtile1" sx={styles.label}>
            Email:&nbsp;
          </Typography>
          <Typography typography="subtile2" sx={styles.value}>
            {formData.email}
          </Typography>
        </Stack>
        <Stack direction="row" sx={styles.infoItem}>
          <Typography typography="subtile1" sx={styles.label}>
            Number:&nbsp;
          </Typography>
          <Typography typography="subtile2" sx={styles.value}>
            {formData.phone}
          </Typography>
        </Stack>
        <Stack direction="row" sx={styles.bottomButtons}>
          <Button variant="outlined" sx={styles.backButton} onClick={onClose}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SubmitModal;
