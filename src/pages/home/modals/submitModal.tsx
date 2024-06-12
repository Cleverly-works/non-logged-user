import React, { Dispatch, SetStateAction } from "react";
import { Modal, Typography, Stack, Button } from "@mui/material";
import { colors } from "../../../const";
// import { IssueType } from "../../../components/molecules";

const styles: Record<string, any> = {
  modal: {
    width: "30%",
    height: "30%",
    backgroundColor: colors.defaultWhite,
    zIndex: 10000,
  },
};

type SubmitModalProps = {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  formData: any;
};

const SubmitModal: React.FC<SubmitModalProps> = ({
  open,
  onClose,
  formData,
}) => {
  console.log(formData);
  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Stack>
        <Typography typography="h4">
          Please check the information entered is correct
        </Typography>
        <Stack direction="row">
          <Typography typography="subtile1">Your location: </Typography>
          <Typography typography="subtile2">
            {formData.location.label}
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography typography="subtile1">Relevant issue: </Typography>
          {/* <IssueType name={} /> */}
        </Stack>
        <Stack direction="row">
          <Typography typography="subtile1">Description: </Typography>
          <Typography typography="subtile2">
            {formData.location.name}
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography typography="subtile1">Your name: </Typography>
          <Typography typography="subtile2">{formData.name}</Typography>
        </Stack>
        <Stack direction="row">
          <Typography typography="subtile1">Email: </Typography>
          <Typography typography="subtile2">{formData.email}</Typography>
        </Stack>
        <Stack direction="row">
          <Typography typography="subtile1">Number: </Typography>
          <Typography typography="subtile2">{formData.phone}</Typography>
        </Stack>
        <Stack direction="row">
          <Button variant="outlined">Back</Button>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default SubmitModal;
