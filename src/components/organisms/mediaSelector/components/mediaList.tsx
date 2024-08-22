import React, { useEffect, useState } from "react";

import { Popover, IconButton, Typography, Stack, Badge } from "@mui/material";
import { Delete, UploadFile } from "@mui/icons-material";
import { colors } from "../../../../const";

const styles = {
  icon: {
    color: colors.defaultBlack,
    width: "20px",
    height: "20px",
  },
  popover: {
    width: "200px",
    marginTop: "20px",
    marginLeft: "10px",
  },
  iconButton: {
    width: "35px",
    borderRadius: "5px!important",
    backgroundColor: `${colors.defaultWhite}!important`,
  },
  badge: {
    backgroundColor: colors.activeGreen,
    zIndex: 1000,
  },
};

type MediaListProps = {
  attachments: File[];
  onDelete: (index: number) => any;
};

export const MediaList: React.FC<MediaListProps> = ({
  attachments,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "attachments-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (attachments?.length) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!attachments?.length) {
      handleClose();
    }
  }, [attachments?.length]);

  const createURL = (attachment: File) => {
    return URL.createObjectURL(attachment);
  };

  return (
    <>
      <Badge color="success" variant="dot" invisible={!attachments?.length}>
        <IconButton onClick={handleClick} sx={styles.iconButton}>
          <UploadFile />
        </IconButton>
      </Badge>

      <Popover
        id={id}
        open={open}
        sx={styles.popover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {attachments.map((attachment, ndx: number) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="inherit"
            p={1}
          >
            <a
              href={createURL(attachment)}
              target="_blank"
              rel="noreferrer"
              style={{
                color: colors.defaultBlack,
                width: "50px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "inline-block",
              }}
            >
              <Typography typography="subtitle2">{attachment.name}</Typography>
            </a>
            <IconButton
              onClick={() => {
                onDelete(ndx);
              }}
            >
              <Delete sx={styles.icon} />
            </IconButton>
          </Stack>
        ))}
      </Popover>
    </>
  );
};
