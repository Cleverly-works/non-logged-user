/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useCallback, ChangeEventHandler } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Stack,
  IconButton,
  TextField,
  Button,
  styled,
  Typography,
  Tooltip,
} from "@mui/material";
import { useForm } from "react-hook-form";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Delete } from "@mui/icons-material";

import { mediaFormSchema } from "./mediaFormSchema";
import { colors } from "../../../../const";

const LabelButton = styled<any>(Typography)({
  backgroundColor: colors.mainBlue,
  color: colors.defaultWhite,
  textAlign: "center",
  minWidth: "64px",
  borderRadius: "4px",
  margin: "10px 0",
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

type MediaSelectorItemProps = {
  noDelete: boolean;
  onDelete: () => {};
  isAdded: boolean;
  media: any;
  caption: string;
  onSave: (data: any) => {};
};

export const MediaSelectorItem: React.FC<MediaSelectorItemProps> = ({
  noDelete,
  onDelete,
  isAdded,
  media,
  caption,
  onSave,
}) => {
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileInputType, setFileInputType] = useState("");
  const [edit, setEdit] = useState(isAdded);
  const { register, handleSubmit, reset } = useForm<any>({
    resolver: yupResolver(mediaFormSchema),
  });

  const handleReselectAttachment = () => {
    setAttachment(null);
    reset();
  };

  const handleCancel = () => {
    setEdit(false);
    onDelete();
  };

  const onSubmit = (data: any) => {
    if (attachment) {
      onSave({ ...data, media: attachment, type: fileInputType });
      setEdit(false);
    }
  };

  const handleAttachment = useCallback(
    (type: string) => (e: any) => {
      const targetFile = e.target.files[0];
      setFileInputType(type);
      setAttachment(targetFile);
    },
    [setAttachment],
  );

  return (
    <form>
      {!edit ? (
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Typography
            sx={{
              color: colors.mainBlue,
              fontWeight: 600,
              pointerEvents: "none",
            }}
          >
            {caption || media?.name}
          </Typography>
          {!noDelete && (
            <Tooltip title="Delete" placement="top-start">
              <IconButton
                size="small"
                sx={{ ":hover": { backgroundColor: "#DDDDDD" } }}
                onClick={onDelete}
              >
                <Delete sx={{ fontSize: "16px" }} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      ) : (
        <Stack>
          <Stack rowGap={2}>
            <TextField
              fullWidth
              label="Caption"
              variant="standard"
              color="primary"
              {...register("caption")}
            />

            {attachment ? (
              <Stack rowGap={3}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      color: colors.mainBlue,
                      fontWeight: 600,
                      pointerEvents: "none",
                    }}
                  >
                    {attachment.name}
                  </Typography>
                  <Tooltip title="Delete" placement="top-start">
                    <IconButton
                      size="small"
                      sx={{ ":hover": { backgroundColor: "#DDDDDD" } }}
                      onClick={handleReselectAttachment}
                    >
                      <Delete sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Stack direction="row" columnGap={3} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack direction="row" columnGap={3} justifyContent="flex-end">
                <LabelButton component="label">
                  Add image&nbsp;
                  <VisuallyHiddenInput
                    onChange={
                      handleAttachment(
                        "image",
                      ) as unknown as ChangeEventHandler<HTMLInputElement>
                    }
                    type="file"
                    accept="image/*, .heic"
                  />
                </LabelButton>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </form>
  );
};
