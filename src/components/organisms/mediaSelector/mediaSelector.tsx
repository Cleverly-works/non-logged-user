import React, { useCallback, ChangeEventHandler } from "react";
import { Typography, styled, Stack } from "@mui/material";

import { FieldValues, UseFormSetValue } from "react-hook-form";
import { colors } from "../../../const";
import { MediaList } from "./components/mediaList";

const styles: Record<string, any> = {
  mediaItems: {
    marginTop: "10px",
    height: "200px",
    overflow: "auto",
  },
  uploadMediaButton: {
    backgroundColor: colors.activeGreen,
    borderRadius: "20px",
    width: "150px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: colors.activeGreen,
      opacity: 0.7,
    },
  },
};

const LabelButton = styled<any>(Typography)({
  backgroundColor: colors.mainBlue,
  color: colors.defaultWhite,
  textAlign: "center",
  minWidth: "64px",
  borderRadius: "4px",
  margin: "10px 0",
  height: "30px",
  alignSelf: "center",
  padding: "4px 10px",
  boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2),
    0px 2px 2px 0px rgba(0,0,0,0.14),
    0px 1px 5px 0px rgba(0,0,0,0.12)`,
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type MediaSelectorProps = {
  values: any[];
  setValue: UseFormSetValue<FieldValues>;
};

const MediaSelector: React.FC<MediaSelectorProps> = ({
  values = [],
  setValue,
}) => {
  const handleDeleteAttachment = (index: number) => {
    const newAttachments = values.filter((_, ndx: number) => ndx !== index);
    setValue("attachments", newAttachments);
  };

  const handleAttachment = useCallback(
    (e: any) => {
      const targetFile = e.target.files[0];
      setValue("attachments", [...values, targetFile]);
    },
    [setValue, values],
  );

  return (
    <Stack>
      <Stack alignItems="flex-start" spacing={1}>
        <Stack direction="row" alignItems="center" columnGap={2}>
          <LabelButton
            component="label"
            variant="contained"
            sx={styles.uploadMediaButton}
          >
            Upload media
            <VisuallyHiddenInput
              onChange={
                handleAttachment as unknown as ChangeEventHandler<HTMLInputElement>
              }
              type="file"
              accept="image/*, .heic"
            />
          </LabelButton>
          <MediaList attachments={values} onDelete={handleDeleteAttachment} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MediaSelector;
