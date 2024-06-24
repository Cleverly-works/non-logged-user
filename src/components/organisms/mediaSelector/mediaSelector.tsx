/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { MouseEvent, useEffect, useState } from "react";
import { Typography, IconButton, Stack, Tooltip, Button } from "@mui/material";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Add } from "@mui/icons-material";

import { MediaSelectorItem } from "./components/mediaSelectorItem";
import { FieldValues, UseFormSetValue } from "react-hook-form";

const styles: Record<string, any> = {
  mediaItems: {
    marginTop: "10px",
    height: "200px",
    overflow: "auto",
  },
  textDefault: {
    textTransform: "none",
  },
};

type MediaSelectorProps = {
  values: any[];
  setValue: UseFormSetValue<FieldValues>;
};

const MediaSelector: React.FC<MediaSelectorProps> = ({ values, setValue }) => {
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(values)) setFields(values);
  }, [values]);

  const handleAddMediaItem = (e: MouseEvent<any, any>) => {
    e.stopPropagation();

    setFields((prev) => [
      ...prev,
      { caption: "", media: null, type: "", isAdded: true },
    ]);
  };

  const handleSaveMedia = (index: number, form: any) => {
    const newfields = [...fields];
    newfields.splice(index, 1, form);
    setValue("attachments", newfields);
  };

  const handleDeleteMedia = (index: number) => () => {
    const attachments = fields.filter((_, ndx) => ndx !== index);
    setValue("attachments" as string, attachments);
    setFields(attachments);
  };

  return (
    <Stack>
      <Stack alignItems="flex-start" spacing={1}>
        <Typography>
          Please upload any media associated with this issue
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={styles.textDefault}
          onClick={handleAddMediaItem}
        >
          Upload media
        </Button>
      </Stack>

      <Stack pl={2} spacing={0.8} sx={styles.mediaItems}>
        {fields.map((attachment, index) => (
          <MediaSelectorItem
            index={index}
            key={attachment?.caption + index}
            {...attachment}
            onDelete={handleDeleteMedia(index)}
            onSave={(form) => handleSaveMedia(index, form)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default MediaSelector;
