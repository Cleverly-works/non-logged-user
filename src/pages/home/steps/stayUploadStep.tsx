import React from "react";
import {
  Typography,
  Stack,
  Button,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { TextField } from "../../../components/atoms";
import { Controller } from "react-hook-form";
import { issueReportFormSteps } from ".";
import { colors } from "../../../const";

type StepProps = {
  setStep: (currentStep: number) => void;
  formOptions: any;
};

const styles = {
  stepLabel: {
    color: colors.halfTransparentBlue,
  },
  subtitle: {
    color: colors.halfTransparentBlue,
  },
  backButton: {
    color: colors.defaultWhite,
    borderColor: colors.defaultWhite,
    borderRadius: "20px",
    width: "150px",
    "&:hover": {
      borderColor: colors.defaultWhite,
      opacity: 0.8,
    },
  },
  nextButton: {
    backgroundColor: colors.activeGreen,
    borderRadius: "20px",
    width: "150px",
    "&:hover": {
      backgroundColor: colors.activeGreen,
      opacity: 0.8,
    },
  },
  nameTextField: {
    width: "100%",
  },
  textField: {
    width: "100%",
    height: "80px",
  },
  notificationsCheckbox: (isWidth425pxOrLess: boolean) => ({
    display: "flex",
    alignItems: "center",
    ...(isWidth425pxOrLess
      ? {
          margin: "20px",
        }
      : {}),
  }),
};

export const StayUploadFormStep: React.FC<StepProps> = ({
  formOptions,
  setStep,
}) => {
  const { register, errors, control, trigger } = formOptions;

  const isWidth425pxOrLess = useMediaQuery("(max-width: 425px)");

  const hasError = errors.name || errors.phone || errors.email;

  const handleValidate = async () => {
    await trigger(["name", "email", "phone"]);
  };

  return (
    <Stack p={isWidth425pxOrLess ? 2 : 7} height="100%" width="90%">
      <Stack spacing={1}>
        {!isWidth425pxOrLess && (
          <Typography typography="h6" sx={styles.stepLabel}>
            Step 4/4
          </Typography>
        )}
        <Typography typography={isWidth425pxOrLess ? "h4" : "h5"}>
          Stay in the loop
        </Typography>
        <Typography
          typography={isWidth425pxOrLess ? "subtitle1" : "subtitle2"}
          sx={styles.subtitle}
        >
          Please add some personal details
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        marginTop={2}
        marginBottom={2}
        rowGap={isWidth425pxOrLess ? 0 : 3}
        flexWrap="wrap"
      >
        <TextField
          sx={styles.textField}
          color="primary"
          placeholder="Your name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Stack
          direction={isWidth425pxOrLess ? "column" : "row"}
          columnGap={3}
          justifyContent="space-between"
          width="100%"
        >
          <TextField
            sx={styles.textField}
            color="primary"
            placeholder="Your email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            sx={styles.textField}
            color="primary"
            placeholder="Your phone number"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Stack>
        <Controller
          control={control}
          name="shouldSendNotifications"
          render={({ field: { value, onChange } }) => (
            <FormControlLabel
              sx={styles.notificationsCheckbox(isWidth425pxOrLess)}
              label="Please check this box if you would like to be notified regarding updates to this issue such as attendance time (if appropriate)"
              control={
                <Checkbox
                  checked={value}
                  color="primary"
                  sx={{ color: "#fff" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target?.checked)
                  }
                />
              }
            />
          )}
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-end" columnGap={2} mt="auto">
        <Button
          onClick={() => setStep(issueReportFormSteps.DETAILS)}
          sx={styles.backButton}
          size="large"
          variant="outlined"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            handleValidate().then(() => {
              if (!hasError) {
                setStep(issueReportFormSteps.CONFIRM);
              }
            });
          }}
          sx={styles.nextButton}
          size="large"
          variant="contained"
        >
          Next step
        </Button>
      </Stack>
    </Stack>
  );
};
